// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './auth/context/AuthContext';
import { FirestoreProvider } from './auth/context/FirestoreContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <FirestoreProvider>
          <App />
        </FirestoreProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
