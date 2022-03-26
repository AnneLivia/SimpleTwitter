import React, { useState } from 'react';
import { Form, FloatingLabel, Row, Col } from 'react-bootstrap';
import CustomButton from './Button';

// d-grid = display grid
const FormLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  return (
    <Form>
      <Row className="justify-content-center">
        <Col md={7} xs={12} className="mb-4">
          <FloatingLabel controlId="floatingUsername" label="Username">
            <Form.Control
              type="text"
              value={username}
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </FloatingLabel>
        </Col>
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
              <CustomButton
                className="me-4"
                text="Login"
                email={email}
                password={password}
                setEmail={setEmail}
                setPassword={setPassword}
              />
            </Col>
            <Col md={6} xs={6} className="d-grid">
              <CustomButton
                text="SignUp"
                email={email}
                password={password}
                setEmail={setEmail}
                setPassword={setPassword}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default FormLogin;
