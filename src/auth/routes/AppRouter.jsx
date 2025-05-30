// src/auth/routes/AppRouter.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../../pages/Login';
import SpotifyCallback from '../../pages/SpotifyCallback';
import Register from '../../pages/Register';
import UserInfo from '../../pages/user-info';
import HomePage from '../../pages/HomePage';
import PrivateRoute from './PrivateRoute';
import PlaylistDetail from '../../pages/PlaylistDetail';

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/spotify-callback" element={<SpotifyCallback />} />
    <Route path="/playlist/:id" element={<PlaylistDetail />} />
    {/* Ruta protegida */}
    <Route
      path="/user-info"
      element={
        <PrivateRoute>
          <UserInfo />
        </PrivateRoute>
      }
    />

    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default AppRouter;
