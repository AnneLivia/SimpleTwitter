import React from 'react';
import { Nav } from 'react-bootstrap';

const Menu = ({ activeKey }) => {
  const loggedUser = sessionStorage.getItem('loggedUser');
  const user = JSON.parse(loggedUser);

  return (
    <>
      <p className="text-center text-primary">{user.email}</p>
      <Nav fill variant="tabs" activeKey={activeKey}>
        <Nav.Item>
          <Nav.Link href="#">All Feed</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/myFeed">My Feed</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/">Logout</Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
};

export default Menu;
