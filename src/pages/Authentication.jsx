import { useState } from 'react';
import LoginFormComponent from '../components/Forms/LoginFormComponent';
import SignUpFormComponent from '../components/Forms/SignUpFormComponent';
import { auth } from '../firebase/config';

const Authentication = () => {
  const [toggleForm, setToggleForm] = useState(true);
  const handleToggle = () => {
    setToggleForm(!toggleForm);
  };
  return (
    <>
      {console.log(auth.currentUser)}
      {toggleForm ? (
        <LoginFormComponent toggleSignUp={handleToggle} />
      ) : (
        <SignUpFormComponent toggleLogin={handleToggle} />
      )}
    </>
  );
};

export default Authentication;
