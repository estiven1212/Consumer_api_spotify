import React from 'react';
import videoBg from '../../assets/videoBg.mp4';
import Navbar from './navbar';

const HomePage = () => {
  return (
    <div className="main">
      <div className="overlay" />
      <video src={videoBg} autoPlay loop muted className="video-bg" />
      <div className="content">
        <Navbar />
        <p>Quieres escuchas tu musica en cualquier lugra
          Unete a nuestra nueva app, que permite reproducir sus canciones
          favoritas sin ningún costo. ¡Te esperamos!
        </p>
        <h1>El equipo dinamita te muestra tu musica preferida</h1>
      </div>
    </div>
  );
};

export default HomePage;
