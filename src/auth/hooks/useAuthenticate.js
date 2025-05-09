import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/config';
import { LOGIN } from '../types/authTypes';

export const useAuthenticate = () => {
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const loginWithProvider = async (provider, onError) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      dispatch({
        type: LOGIN,
        payload: {
          name: user.displayName,
          email: user.email,
        },
      });

      navigate('/user-info');
    } catch (error) {
      if (error.code === 'auth/account-exists-with-different-credential') {
        onError('Este correo ya está registrado con otro proveedor.');
      } else {
        onError(error.message);
      }
    }
  };

  const loginWithGoogle = (onError) => {
    const provider = new GoogleAuthProvider();
    loginWithProvider(provider, onError);
  };

  const loginWithFacebook = (onError) => {
    const provider = new FacebookAuthProvider();
    loginWithProvider(provider, onError);
  };

  const loginWithEmail = async (email, password, onError) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      dispatch({
        type: LOGIN,
        payload: {
          name: result.user.displayName,
          email: result.user.email,
        },
      });
      navigate('/user-info');
    } catch (error) {
      onError(error.message);
    }
  };

  return { loginWithGoogle, loginWithFacebook, loginWithEmail };
};
