import { useState, createContext, useEffect } from 'react';
import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      // unsub();
      if (user && user.uid) {
        localStorage.setItem('user', JSON.stringify(user));
        setCurrentUser(user);
        console.log('User is signed in as ' + user.email);
        // console.log(user);
      } else {
        localStorage.removeItem('user');
        setCurrentUser(null);
        console.log('No user is signed in');
      }
    });
    return unsub;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
