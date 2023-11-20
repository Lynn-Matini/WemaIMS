import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCgFoxpxyu2FUx4142li9e1ZnWw7_6PhIk',
  authDomain: 'wema-ims.firebaseapp.com',
  projectId: 'wema-ims',
  storageBucket: 'wema-ims.appspot.com',
  messagingSenderId: '555539923295',
  appId: '1:555539923295:web:93c6ed80c77442f72ff6ea',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();

//update firestore settings
// db.settings({ timestampsInSnapshots: true });
