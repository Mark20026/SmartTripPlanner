// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7rDL68wJr8XCzf9uAlzS7-egz3RmUPS0",
  authDomain: "smart-trip-planner-26c6f.firebaseapp.com",
  projectId: "smart-trip-planner-26c6f",
  storageBucket: "smart-trip-planner-26c6f.appspot.com",
  messagingSenderId: "160716634950",
  appId: "1:160716634950:web:74e7a7ec2ecccc07d34347",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
