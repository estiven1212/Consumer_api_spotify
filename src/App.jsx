import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './auth/components/HomePage';
import Navbar from './auth/components/navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import UserInfo from './pages/user-info';


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/user-info" element={<UserInfo />}/>
    </Routes>
  );
}

export default App;
