import React from 'react';
import useNavbar from '../hooks/useNavbar';
import '../../styles/UserInfo.css';

const UserNavbar = ({ profile }) => {
  const { user, handleLogout } = useNavbar();

  return (
    <div className="navbar-user">
      <div className="left-section">
        <input type="text" placeholder="Buscar canciones o artistas..." className="search-input" />
      </div>
      <div className="right-section">
        {profile?.images?.[0]?.url && (
          <img src={profile.images[0].url} alt="Avatar" className="avatar" />
        )}
        <div className="user-profile">
          <span>{profile?.display_name || user?.name || 'Usuario'}</span>
          <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
        </div>
      </div>
    </div>
  );
};

export default UserNavbar;
