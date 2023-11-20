import { auth } from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../firebase/config';
import { doc } from 'firebase/firestore';
import { setDoc } from 'firebase/firestore';

let error = null;
const signUp = async (email, password, displayName) => {
  try {
    // sign up with email and password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Add a new document to the "users" collection with user details
    const userDocRef = doc(db, 'users', userCredential.user.uid);
    await setDoc(userDocRef, {
      displayName: displayName,
      email: email,
    });
    console.log('User registered successfully!');
    if (!userCredential) {
      throw new Error('Something went wrong, try again!');
    }
  } catch (error) {
    console.error('Error registering user: ', error.message);
  }
};

const userSignUp = () => {
  return { signUp, error };
};

export default userSignUp;
