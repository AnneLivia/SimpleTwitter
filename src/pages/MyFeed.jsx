import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import Tweetar from '../components/Tweetar';
import Feed from '../components/Feed';
import Menu from '../components/Menu';

const MyFeed = () => {
  const [tweets, setTweets] = useState([]);

  return (
    // lifting state up:
    // In React, sharing state is accomplished by moving it up to the closest common ancestor of the components that need it.
    <Container className="mt-4">
      <Menu activeKey="/myFeed" />
      <Feed tweets={tweets} setTweets={setTweets} />
      <Tweetar setTweets={setTweets} />
    </Container>
  );
};

export default MyFeed;
