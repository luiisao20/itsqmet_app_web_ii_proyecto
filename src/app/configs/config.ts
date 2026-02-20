// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: 'AIzaSyCtjB7ZNIgjSlF7MvrYeRJLm-PnulIHPZc',
  authDomain: 'aula-virtual-geapsi.firebaseapp.com',
  databaseURL: 'https://aula-virtual-geapsi-default-rtdb.firebaseio.com',
  projectId: 'aula-virtual-geapsi',
  storageBucket: 'aula-virtual-geapsi.appspot.com',
  messagingSenderId: '1011246169979',
  appId: '1:1011246169979:web:39c242e2f1f9c5a82887de',
  measurementId: 'G-QWW8JEM9Q0',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
