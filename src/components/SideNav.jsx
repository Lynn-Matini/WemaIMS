import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import './Components.css';
import { useNavigate } from 'react-router-dom';
import userLogout from '../auth/userLogout';
import { AuthContext } from '../components/auth';

const SideNav = () => {
  const navigate = useNavigate();
  const { error, logout } = userLogout();
  const { currentUser } = useContext(AuthContext);

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
            {currentUser && currentUser.email}
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
