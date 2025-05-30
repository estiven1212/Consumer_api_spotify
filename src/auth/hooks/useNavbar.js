import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LOGOUT } from '../types/authTypes';

const useNavbar = () => {
  const { user, dispatch } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
     localStorage.removeItem("spotifyAccessToken");
  localStorage.removeItem("spotifyRefreshToken");
    dispatch({ type: LOGOUT });
    navigate('/login');
  };

  return {
    isLoggedIn: !!user,
    user,
    handleLogout,
  };
};
export default useNavbar;