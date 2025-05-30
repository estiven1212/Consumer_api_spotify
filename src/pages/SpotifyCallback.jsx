import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/context/AuthContext';
import { LOGIN } from '../auth/types/authTypes';

const SpotifyCallback = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token = params.get('access_token');

    if (token) {
      localStorage.setItem('spotify_token', token);

      fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch({
            type: LOGIN,
            payload: {
              name: data.display_name,
              email: data.email,
            },
          });
          navigate('/user-info');
        })
        .catch((err) => {
          console.error(err);
          navigate('/login');
        });
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate]);

  return <p>Estamos logueando con Spoti</p>;
};

export default SpotifyCallback;
