import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBPkBzaJSIkCezXVftiE55GjN4GsQaEQAg",
  authDomain: "fir-tutorial-c42db.firebaseapp.com",
  projectId: "fir-tutorial-c42db",
  storageBucket: "fir-tutorial-c42db.appspot.com",
  messagingSenderId: "1080739934131",
  appId: "1:1080739934131:web:b73dc4d4c70ee188d1a5c6",
  measurementId: "G-8GH3DCPF23"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)