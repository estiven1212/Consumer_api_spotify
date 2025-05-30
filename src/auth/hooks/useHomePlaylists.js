import { useState, useEffect } from 'react';
import { fetchFeaturedPlaylists } from '../../spotify/spotifyService';

export const useHomePlaylists = (token) => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPlaylists = async () => {
      if (!token) return;
      try {
        const data = await fetchFeaturedPlaylists(token);
        setPlaylists(data.playlists?.items || []);
      } catch (e) {
        console.error('Error al obtener playlists destacadas:', e);
      } finally {
        setLoading(false);
      }
    };
    getPlaylists();
  }, [token]);

  return { playlists, loading };
};
