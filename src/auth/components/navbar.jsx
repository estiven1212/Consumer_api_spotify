import React from 'react';
import Button from '@mui/material/Button';
import musica from '../../assets/musica.png'

const Navbar = () => {
  return (
    <>
    <div className='Logo'>
      <h1>QiuPlay</h1>
      <img src={musica} alt="" />
    </div>
    <div className="navbar">
      <Button variant="contained"><a href="/login">Login</a></Button>
      <Button variant="contained"><a href="/register">Register</a></Button>
    </div>
    </>
  );
};

export default Navbar;
