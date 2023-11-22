import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { db } from '../firebase/config';
import { doc } from 'firebase/firestore';
import { getDoc } from 'firebase/firestore';

let error = null;
const login = async (email, password) => {
  try {
    // sign up with email and password
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Get an existing document from the "users" collection with user details
    const userDocRef = doc(db, 'users', userCredential.uid);
    await getDoc(userDocRef);
    console.log('User logged in successfully!');
    if (!userCredential) {
      throw new Error('Something went wrong, try again!');
    }
  } catch (error) {
    console.error('Error logging in user: ', error.message);
  }
};

const userLogin = () => {
  return { login, error };
};

export default userLogin;
