import React, { useEffect } from 'react';
import CustomForm from '../components/loginSignUp/CustomForm';
import { Container, Image } from 'react-bootstrap';

const LoginSignUp = () => {
  // execute once when render this page
  useEffect(() => {
    console.log('hshisd');
    // erase all logged user info, either because this is the first entry
    // or because the user clicked on logout
    sessionStorage.clear();
  }, []);

  return (
    // mt-4 = margin-top p = pagging, w = width = 50%
    // mx = margin left and right, d-block = display block = center image
    <Container className="mt-4 p-4 w-50">
      <Image
        width={80}
        className="mx-auto d-block mb-3"
        src="https://cdn4.iconfinder.com/data/icons/social-media-icons-the-circle-set/48/twitter_circle-512.png"
      />
      <h2 className="text-center text-info mb-5">Simple Twitter</h2>
      <CustomForm />
    </Container>
  );
};

export default LoginSignUp;
