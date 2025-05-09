import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import '../styles/Login.css';
import { useAuthenticate } from '../auth/hooks/useAuthenticate';

const Login = () => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginWithGoogle, loginWithFacebook, loginWithEmail } = useAuthenticate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError(null);
    loginWithEmail(email, password, setError);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        {error && <p className="error-text">{error}</p>}

        <form onSubmit={handleFormSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="form-button">Login</button>
        </form>

        <div className="divider">O</div>

        <button className="login-button google" onClick={() => loginWithGoogle(setError)}>
          <FcGoogle className="icon" /> Login with Google
        </button>

        <button className="login-button Facebook" onClick={() => loginWithFacebook(setError)}>
          <FaFacebook className="icon" /> Login with Facebook
        </button>
      </div>
    </div>
  );
};

export default Login;
