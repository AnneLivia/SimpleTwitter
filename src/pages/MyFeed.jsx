import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Tweetar from '../components/Tweetar';
import Feed from '../components/Feed';
import Menu from '../components/Menu';
import { Navigate } from 'react-router-dom';

const MyFeed = () => {
  const [tweets, setTweets] = useState([]);

  // execute once when render this page
  // if user is not logged,then return to login

  const loggedUser = sessionStorage.getItem('loggedUser');

  // if there's a logged user, then, render feed page.
  return loggedUser ? (
    // lifting state up:
    // In React, sharing state is accomplished by moving it up to the closest common ancestor of the components that need it.
    <Container className="mt-4">
      <Menu activeKey="/myFeed" />
      <Feed tweets={tweets} setTweets={setTweets} />
      <Tweetar setTweets={setTweets} />
    </Container>
  ) : (
    // otherwise, using Navigate component of react-router-dom to redirect to login.
    <Navigate to="/" />
  );
};

export default MyFeed;
