import React, { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from '../firebase/config.js';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import '../styles/Register.css';
import { useAuth } from '../auth/context/AuthContext';
import { LOGIN } from '../auth/types/authTypes';
import { FaFacebook } from 'react-icons/fa';

const Register = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false); 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirm) {
      return setError('Las contraseñas no coinciden');
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await updateProfile(userCredential.user, { displayName: form.name });

      setSuccess(true);  
      setTimeout(() => navigate('/login'), 3000); 
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleRegister = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      dispatch({
        type: LOGIN,
        payload: {
          name: result.user.displayName,
          email: result.user.email,
        }
      });
      navigate('/user-info');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Registro</h2>
        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">¡Registro exitoso! Redirigiendo al login...</p>}
        
        {!success && (
          <>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Nombre completo"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={form.password}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="confirm"
                placeholder="Confirmar contraseña"
                value={form.confirm}
                onChange={handleChange}
                required
              />
              <button type="submit" className="form-button">Registrarse</button>
            </form>

            <div className="divider">O</div>

            <button className="login-button google" onClick={handleGoogleRegister}>
              <FcGoogle className="icon" /> Registrarse con Google
            </button>
            <button className="login-button google" onClick={handleGoogleRegister}>
              <FaFacebook className="icon" /> Registrarse con Hermes.com
            </button>
        <p className="switch-auth">
        ¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a>
        </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Register;
