import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Tweetar from '../components/Tweetar';
import Feed from '../components/Feed';
import Menu from '../components/Menu';
import { Navigate } from 'react-router-dom';

// need to load all tweets from current user
async function fetchTweets(token) {
  const response = await fetch('http://localhost:4000/api/tweets', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
}

const loggedUser = JSON.parse(sessionStorage.getItem('loggedUser'));

const MyFeed = () => {
  const [tweets, setTweets] = useState([]);

  // execute always when tweets update
  // if user is not logged,then return to login
  useEffect(() => {
    async function execFetch() {
      const resp = await fetchTweets(loggedUser.token);
      const newTweets = resp.tweets.map(({ text, date, _id }) => {
        return {
          text,
          date,
          id: _id,
        };
      });

      setTweets(newTweets);
    }

    execFetch();
  }, []);

  // if there's a logged user, then, render feed page.
  return loggedUser ? (
    // lifting state up:
    // In React, sharing state is accomplished by moving it up to the closest common ancestor of the components that need it.
    <Container className="mt-4">
      <Menu activeKey="/myFeed" />
      <Feed tweets={tweets} setTweets={setTweets} />
      <Tweetar setTweets={setTweets} token={loggedUser.token} />
    </Container>
  ) : (
    // otherwise, using Navigate component of react-router-dom to redirect to login.
    <Navigate to="/" />
  );
};

export default MyFeed;
