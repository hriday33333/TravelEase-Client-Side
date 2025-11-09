// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAZsxINXKnFQ4X92UzhLf3EYil-qHpwxbc',
  authDomain: 'travelease-client-side.firebaseapp.com',
  projectId: 'travelease-client-side',
  storageBucket: 'travelease-client-side.firebasestorage.app',
  messagingSenderId: '845489904329',
  appId: '1:845489904329:web:c8d6fe9c18e90597bb4b18',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
