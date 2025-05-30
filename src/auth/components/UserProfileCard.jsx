// src/auth/components/UserProfileCard.jsx
import React from 'react';
import '../../styles/UserInfo.css';

const UserProfileCard = ({ profile }) => {
  if (!profile) return null;

  const handleEditSpotifyProfile = () => {
    window.open('https://www.spotify.com/account/profile/', '_blank');
  };

  const handleSpotifySettings = () => {
    window.open('https://www.spotify.com/account/overview/', '_blank');
  };

  return (
    <div className="profile-card">
      <img
        className="profile-avatar"
        src={profile.images?.[0]?.url || 'https://i.imgur.com/NMZcC94.png'}
        alt={profile.display_name}
      />
      <div className="profile-details">
        <h2>{profile.display_name}</h2>
        <p>{profile.email}</p>
        <a
          href={profile.external_urls?.spotify}
          target="_blank"
          rel="noreferrer"
          className="spotify-link"
        >
          Ver en Spotify &rarr;
        </a>
      </div>
      
      {/* Botones de Spotify arriba a la derecha */}
      <div className="profile-actions">
        <button 
          onClick={handleEditSpotifyProfile}
          className="spotify-action-btn primary"
          title="Editar tu perfil de Spotify"
        >
          Editar perfil de Spotify
        </button>
        
        <button 
          onClick={handleSpotifySettings}
          className="spotify-action-btn secondary"
          title="Configuración de tu cuenta de Spotify"
        >
          Configuración de cuenta
        </button>
      </div>
    </div>
  );
};

export default UserProfileCard;