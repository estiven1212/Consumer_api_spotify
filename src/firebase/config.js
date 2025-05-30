// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,FacebookAuthProvider} from 'firebase/auth';
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwcyy5yH0NUVkX0vVcpHy2r4j2IlNiEJc",
  authDomain: "entrega-a31cd.firebaseapp.com",
  projectId: "entrega-a31cd",
  storageBucket: "entrega-a31cd.firebasestorage.app",
  messagingSenderId: "513253724551",
  appId: "1:513253724551:web:2c8174183ac4d028990322"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new FacebookAuthProvider();

export { auth,provider };
export const FirebaseDB = getFirestore(app);
