import { auth } from '../firebase/config';

let error = null;

const logout = async () => {
  error = null;

  try {
    await signOut(auth);
  } catch (err) {
    error = err.message;
  }
};

const userLogout = () => {
  return { logout, error };
};

export default userLogout;
