// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkSnZcIg69fyt5AaDBbCN6zLMhaXayVMU",
  authDomain: "contact-app-d97f2.firebaseapp.com",
  projectId: "contact-app-d97f2",
  storageBucket: "contact-app-d97f2.appspot.com",
  messagingSenderId: "794365262210",
  appId: "1:794365262210:web:54f4a93afc91ebe2d2779b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db =getFirestore(app);