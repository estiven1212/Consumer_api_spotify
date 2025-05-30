import { createContext, useContext, useReducer, useEffect } from 'react';
import { FirebaseDB } from '../../firebase/config';
import { collection, getDocs, addDoc } from 'firebase/firestore/lite';
import { firestoreReducer } from '../reducers/firestoreReducer';

const FirestoreContext = createContext();

const initialState = {
  users: [],
  error: null,
};

export const FirestoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(firestoreReducer, initialState);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCol = collection(FirebaseDB, 'users');
        const snapshot = await getDocs(usersCol);
        const usersList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        dispatch({ type: 'SET_USERS', payload: usersList });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
      }
    };

    fetchUsers();
  }, []);

  const addUser = async (user) => {
    try {
      const docRef = await addDoc(collection(FirebaseDB, 'users'), user);
      dispatch({ type: 'ADD_USER', payload: { id: docRef.id, ...user } });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  return (
    <FirestoreContext.Provider value={{ ...state, addUser }}>
      {children}
    </FirestoreContext.Provider>
  );
};

export const useFirestore = () => useContext(FirestoreContext);
