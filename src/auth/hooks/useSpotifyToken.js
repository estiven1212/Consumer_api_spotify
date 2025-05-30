import { useEffect, useState } from 'react';

export const useSpotifyToken = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const hash = window.location.hash;
    const tokenFromHash = new URLSearchParams(hash.substring(1)).get('access_token');
    
    if (tokenFromHash) {
      localStorage.setItem('spotify_token', tokenFromHash);
      setToken(tokenFromHash);
      window.history.pushState({}, null, window.location.pathname); // limpia hash
    } else {
      const storedToken = localStorage.getItem('spotify_token');
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, []);

  return token;
};
