import { Link } from 'react-router-dom';
import './Components.css';
import { useNavigate } from 'react-router-dom';
import userLogout from '../auth/userLogout';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useEffect } from 'react';

const SideNav = () => {
  const navigate = useNavigate();
  const { error, logout } = userLogout();
  const user = auth.currentUser;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is signed in');
        console.log(user);
      } else {
        console.log('No user is signed in');
      }
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    if (!error) {
      await logout();
      navigate('/');
    }
  };
  return (
    <div className="sidenav">
      <ul>
        <div className="userText">
          <p>
            Signed in as:
            <br />
            {user?.email}
          </p>
        </div>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>

        <li>
          <Link to="/providers">Providers</Link>
        </li>
        <li>
          <Link to="/claims">Claims</Link>
        </li>
        <li>
          <Link to="/checkout">Checkout</Link>
        </li>
        <li>
          <Link onClick={handleLogout}>Log Out</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;
