import React, { useState } from 'react';
import { Form, FloatingLabel, Row, Col, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// d-grid = display grid
const CustomForm = () => {
  // This is going to be replaced by api
  // const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [signUp, setSignUp] = useState(false);
  const [error, setError] = useState({ text: '', status: false });

  /*
    useEffect(() => {
    console.log(users);
  }, [users]);*/

  // useNavigate is a hook that allows to navigate through routes programmatically
  // useNavigation() returns the navigation prop of the screen it's inside.
  // this hook replaces the useHistory() hook
  // this hook helps to go to the specific URL, forward or backward (navigate.back()) pages
  const navigate = useNavigate();

  const loginUser = async () => {
    const response = await fetch('http://localhost:4000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    console.log('here');
    const data = await response.json();

    if (response.status === 404 || response.status === 401) {
      return setError({ text: data.message, status: true });
    }

    // using sessionStorage to store the user information, it is going to be erased only
    // when user close browser.
    sessionStorage.setItem(
      'loggedUser',
      JSON.stringify({ email, token: data.token })
    );

    setEmail('');
    setPassword('');

    return navigate('/myFeed');
  };

  const signUpUser = async () => {
    // const found = users.find((user) => user.email === email);
    const response = await fetch('http://localhost:4000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    });

    const data = await response.json();
    if (response.status === 404 || response.status === 400) {
      return setError({ text: data.message, status: true });
    }

    //setUsers([...users, { email, name, password }]);

    setName('');
    setEmail('');
    setPassword('');
    // returning back to login
    setSignUp(false);
  };

  return (
    <Form>
      <Row className="justify-content-center">
        {error.status && (
          <Col md={7} xs={12} className="mb-4">
            <Alert
              variant="danger"
              onClose={() => setError({ text: '', status: false })}
              dismissible
            >
              <p>{error.text}</p>
            </Alert>
          </Col>
        )}
        {signUp && (
          <Col md={7} xs={12} className="mb-4">
            <FloatingLabel controlId="floatingName" label="Name">
              <Form.Control
                type="text"
                value={name}
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </FloatingLabel>
          </Col>
        )}
        <Col md={7} xs={12} className="mb-4">
          <FloatingLabel controlId="floatingEmail" label="Email address">
            <Form.Control
              type="email"
              value={email}
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FloatingLabel>
        </Col>
        <Col md={7} xs={12} className="mb-4">
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FloatingLabel>
        </Col>

        <Col md={7} xs={12}>
          <Row>
            <Col md={6} xs={6} className="d-grid">
              <Button
                onClick={
                  // if sign up is false, it means that the user wants to login,
                  // othwerwise, the butting is back
                  () => {
                    return !signUp ? loginUser() : setSignUp(false);
                  }
                }
              >
                {signUp ? 'Back' : 'Login'}
              </Button>
            </Col>
            <Col md={6} xs={6} className="d-grid">
              <Button
                onClick={
                  // if signUp state is true, it will execute the method to sign up, otherwise, it will
                  // set the sign up state to true, and username is going to appear
                  () => {
                    return signUp ? signUpUser() : setSignUp(true);
                  }
                }
              >
                Sign Up
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default CustomForm;
