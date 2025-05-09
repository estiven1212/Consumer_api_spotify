import { createContext, useContext, useReducer, useEffect } from 'react';
import { auth } from '../../firebase/config.js';
import { onAuthStateChanged } from 'firebase/auth';
import { authReducer } from '../reducers/authReducer';
import { LOGIN, LOGOUT } from '../types/authTypes';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const initialState = {
  user: null
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        dispatch({
          type: LOGIN,
          payload: {
            name: firebaseUser.displayName,
            email: firebaseUser.email,
          }
        });
      } else {
        dispatch({ type: LOGOUT });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
