import React from 'react';
import videoBg from '../assets/videoBg.mp4';
import Navbar from '../auth/components/navbar';
import { useSpotifyToken } from '../auth/hooks/useSpotifyToken';
import { useHomePlaylists } from '../auth/hooks/useHomePlaylists';
import '../styles/HomePage.css';
import '../styles/index.css';

const HomePage = () => {
  const token = useSpotifyToken();
  const { playlists, loading } = useHomePlaylists(token);

  return (
    <div className="main">
      <div className="overlay" />
      <video src={videoBg} autoPlay loop muted className="video-bg" />
      <div className="content">
        <Navbar />
        <h1>El equipo dinamita te muestra tu música preferida</h1>

        {!token && <p style={{ color: 'white' }}>Inicia sesión con Spotify para ver contenido.</p>}

        {token && (
          <div className="featured-playlists">
            <h2>Playlists destacadas</h2>
            {loading ? (
              <p style={{ color: 'white' }}>Cargando...</p>
            ) : (
              <div className="track-grid">
                {playlists.map((playlist) => (
                  <div className="track-card" key={playlist.id}>
                    <img src={playlist.images[0]?.url} alt={playlist.name} />
                    <div className="track-info">
                      <h4>{playlist.name}</h4>
                      <p>{playlist.tracks.total} canciones</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
