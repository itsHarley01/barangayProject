
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAllXy2Xm_xhy2VAARGvulFas4QypXUn7Y",
  authDomain: "barangay-guadalupe-6c51a.firebaseapp.com",
  databaseURL: "https://barangay-guadalupe-6c51a-default-rtdb.firebaseio.com",
  projectId: "barangay-guadalupe-6c51a",
  storageBucket: "barangay-guadalupe-6c51a.appspot.com",
  messagingSenderId: "83176267010",
  appId: "1:83176267010:web:a0dc377fe01b6c8675b61b",
  measurementId: "G-C296KGW33Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app); 
const auth = getAuth(app);
const storage = getStorage(app)

export{ db, auth, analytics, storage }; 
