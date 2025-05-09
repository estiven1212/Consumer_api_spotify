import React from 'react';
import { useAuth } from '../auth/context/AuthContext';
import data from '../mocks/data.json';
import '../styles/UserInfo.css';
import { FaPlay } from 'react-icons/fa';
import { LOGOUT } from '../auth/types/authTypes';

const UserInfo = () => {
  const { user, dispatch } = useAuth();

  const handleLogout = () => {
    dispatch({ type: LOGOUT });
  };

  return (
    <div className="user-info">
      <div className="container">
        {user ? (
          <>
            <h2>Sesión iniciada</h2>
            <div className="user-data">
              <p><strong>Nombre:</strong> {user.name || 'Sin nombre disponible'}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>

            <div className="track-section">
              <h3>Tus canciones más escuchadas</h3>
              <div className="track-grid">
                {data.map(track => (
                  <div className="track-card" key={track.id}>
                    <img src={track.image} alt={track.title} />
                    <div className="track-info">
                      <h4>{track.title}</h4>
                      <p>{track.artist}</p>
                    </div>
                    <button className="play-button"><FaPlay /></button>
                  </div>
                ))}
              </div>
            </div>

            <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
          </>
        ) : (
          <p>No hay sesión activa.</p>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
