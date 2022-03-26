import { Button } from 'react-bootstrap';
import React from 'react';

const CustomButton = ({ text, email, password, setEmail, setPassword }) => {
  const loginUser = () => {
    console.log(email, password);
    console.log('login');
    setEmail('');
    setPassword('');
  };

  const signUpUser = () => {
    console.log(email, password);
    console.log('signup');
    setEmail('');
    setPassword('');
  };

  return (
    // if text is login = load login function
    <Button size="lg" onClick={text === 'Login' ? loginUser : signUpUser}>
      {text}
    </Button>
  );
};

export default CustomButton;
