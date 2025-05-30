// src/auth/hooks/useSpotifyData.js
import { useState, useEffect } from 'react';
import {
  fetchUserProfile,
  fetchUserTopTracks,
  fetchUserPlaylists,
  fetchUserTopArtists,
  fetchRecentlyPlayed,
  fetchFeaturedTracks,
} from '../../spotify/spotifyService';

export const useSpotifyData = (token) => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [artists, setArtists] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [featuredTracks, setFeaturedTracks] = useState([]);

  useEffect(() => {
    const getData = async () => {
      if (!token) return;
      try {
        setLoading(true);
        const [p, t, pl, a, r, f] = await Promise.all([
          fetchUserProfile(token),
          fetchUserTopTracks(token),
          fetchUserPlaylists(token),
          fetchUserTopArtists(token),
          fetchRecentlyPlayed(token),
          fetchFeaturedTracks(token),
        ]);
        setProfile(p);
        setTracks(t.items || []);
        setPlaylists(pl.items || []);
        setArtists(a.items || []);
        setRecentlyPlayed(r.items || []);
        setFeaturedTracks(f || []); // <- corregido
      } catch (e) {
        console.error('Error al cargar datos de Spotify:', e);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [token]);

  return {  profile, tracks, playlists, artists, recentlyPlayed, featuredTracks, loading };
};
