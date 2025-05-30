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
import { useFirestore } from '../context/FirestoreContext';

export const useAuthenticate = () => {
  const { dispatch } = useAuth();
  const { addUser } = useFirestore(); 
  const navigate = useNavigate();

  const saveUser = (user) => {
    addUser({
      name: user.displayName,
      email: user.email,
      provider: user.providerId || 'email',
    });
  };

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

      saveUser(user);
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
      saveUser(result.user); 
      navigate('/user-info');
    } catch (error) {
      onError(error.message);
    }
  };

  const loginWithSpotify = () => {
    const clientId = '878d54a7034a4257b382b4e2a9757d00';
    const redirectUri = 'http://localhost:5173/spotify-callback';

    const scopes = [
      'user-read-email',
      'user-read-private',
      'user-top-read',
      'user-read-recently-played',
      'playlist-read-private',
      'playlist-read-collaborative',
      'user-read-playback-state',
      'streaming',
    ];

    const authUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=${encodeURIComponent(
      scopes
    )}&redirect_uri=${encodeURIComponent(redirectUri)}`;

    window.location.href = authUrl;
  };

  return {
    loginWithGoogle,
    loginWithFacebook,
    loginWithEmail,
    loginWithSpotify,
  };
};
