import { useState } from 'react';
import userLogin from '../../auth/userLogin';
import { useNavigate, useLocation } from 'react-router-dom';
import './Login&Signup.css';

const LoginFormComponent = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const { error, login } = userLogin();

  const navigate = useNavigate();
  const location = useLocation();
  // replace the login route in the stack
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    if (!error) {
      navigate(from, { replace: true });
      setEmail('');
      setPassword('');
      console.log('Success');
      return;
    }
    setErrorMessage(error);
  };
  return (
    <>
      <div className="login">
        <h2 className="loginTitle mb-4">Login to your account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p>{errorMessage}</p>}
          <button className="authButton" type="submit">
            Login
          </button>
        </form>
        <p>Have no account yet?</p>
        <button className="authButton" onClick={props.toggleSignUp}>
          Sign up
        </button>
      </div>
    </>
  );
};

export default LoginFormComponent;
