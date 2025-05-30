import React, { useState } from 'react';
import '../styles/UserInfo.css';
import { Link } from 'react-router-dom';
import { useSpotifyToken } from '../auth/hooks/useSpotifyToken';
import { useSpotifyData } from '../auth/hooks/useSpotifyData';
import UserNavbar from '../auth/components/UserNavbar';
import UserProfileCard from '../auth/components/UserProfileCard';
import { auth } from '../firebase/config';

const UserInfo = () => {
  const token = useSpotifyToken();
  const {
    profile,
    tracks,
    playlists,
    artists,
    recentlyPlayed,
    featuredTracks,
    loading,
  } = useSpotifyData(token);

  const [previewUrl, setPreviewUrl] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const reloadProfile = () => setRefresh(!refresh);

  if (!token) return <p>No autorizado. Inicia sesión con Spotify.</p>;
  if (loading) return <p className="loading-text">Cargando tu información...</p>;

  const renderTrackCard = (track) => (
    <div
      className="track-card"
      key={track.id}
      onClick={() => track.preview_url && setPreviewUrl(track.preview_url)}
      style={{ cursor: track.preview_url ? 'pointer' : 'default' }}
      title={track.preview_url ? 'Haz clic para escuchar la previa' : 'Previa no disponible'}
    >
      <img src={track.album?.images?.[0]?.url || ''} alt={track.name} />
      <div className="track-info">
        <h4>{track.name}</h4>
        <p>{track.artists?.map((a) => a.name).join(', ')}</p>
      </div>
    </div>
  );

  return (
    <div className="user-info">
      <div className="container">
        <UserNavbar profile={profile} />
        <UserProfileCard profile={profile} />

        <div className="track-section">
          <h3>Tus canciones más escuchadas</h3>
          <div className="track-grid">
            {tracks.length > 0 ? (
              tracks.map(renderTrackCard)
            ) : (
              <p>No hay canciones favoritas disponibles.</p>
            )}
          </div>
        </div>

        
        <div className="track-section">
          <h3>my playlists</h3>
          <div className="track-grid">
            {playlists.length > 0 ? (
              playlists.map((playlist) => (
                <Link to={`/playlist/${playlist.id}`} key={playlist.id}>
                  <div className="track-card">
                    <img src={playlist.images?.[0]?.url || ''} alt={playlist.name} />
                    <div className="track-info">
                      <h4>{playlist.name}</h4>
                      <p>{playlist.tracks?.total || 0} songs</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p>No tienes playlists aún.</p>
            )}
          </div>
        </div>

        <div className="track-section">
          <h3>Tus artistas más escuchados</h3>
          <div className="track-grid">
            {artists.length > 0 ? (
              artists.map((artist) => (
                <div className="track-card" key={artist.id}>
                  <img src={artist.images?.[0]?.url || ''} alt={artist.name} />
                  <div className="track-info">
                    <h4>{artist.name}</h4>
                    <p>{artist.genres?.slice(0, 2).join(', ')}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No hay artistas disponibles.</p>
            )}
          </div>
        </div>

        <div className="track-section">
          <h3>Escuchado recientemente</h3>
          <div className="track-grid">
            {recentlyPlayed.length > 0 ? (
              recentlyPlayed.map((item) => renderTrackCard(item.track))
            ) : (
              <p>No hay historial de reproducción.</p>
            )}
          </div>
        </div>

        {featuredTracks.length > 0 && (
          <div className="track-section">
            <h3>Canciones destacadas con previa</h3>
            <div className="track-grid">
              {featuredTracks.map(renderTrackCard)}
            </div>
          </div>
        )}

        {previewUrl && (
          <audio
            src={previewUrl}
            controls
            autoPlay
            onEnded={() => setPreviewUrl(null)}
            style={{ marginTop: '2rem', width: '100%' }}
          />
        )}
      </div>
    </div>
  );
};

export default UserInfo;