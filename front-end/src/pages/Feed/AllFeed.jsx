import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Tweetar from './components/Tweetar';
import Feed from './components/Feed';
import Menu from './components/Menu';
import { Navigate } from 'react-router-dom';

// need to load all tweets from current user
async function fetchTweets(token) {
  const response = await fetch('http://localhost:4000/api/tweets?all=true', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
}

const AllFeed = () => {
  const [AllTweets, setAllTweets] = useState([]);

  // execute always when tweets update
  // if user is not logged,then return to login
  useEffect(() => {
    const loggedUser = JSON.parse(sessionStorage.getItem('loggedUser'));

    async function execFetch() {
      const resp = await fetchTweets(loggedUser.token);

      const newTweets = resp.tweets.map((tweet) => {
        return {
          text: tweet.text,
          date: tweet.date,
          id: tweet._id,
          name: tweet.user.name,
          email: tweet.user.email,
        };
      });

      // console.log(resp);

      setAllTweets(newTweets);
    }

    execFetch();
  }, []);

  // useEffect(() => {
  // console.log(AllTweets);
  // }, [AllTweets]);

  const loggedUser = JSON.parse(sessionStorage.getItem('loggedUser'));

  // if user is not logged, using Navigate component of react-router-dom, redirect to login.
  if (!loggedUser) {
    return <Navigate to="/" />;
  }

  // if there's a logged user, then, render feed page.
  return (
    // lifting state up:
    // In React, sharing state is accomplished by moving it up to the closest common ancestor of the components that need it.
    <Container className="mt-4">
      <Menu activeKey="/allFeed" />
      <Feed
        tweets={AllTweets}
        setTweets={setAllTweets}
        token={loggedUser.token}
        userLoggedEmail={loggedUser.email}
      />
      <Tweetar setTweets={setAllTweets} token={loggedUser.token} />
    </Container>
  );
};

export default AllFeed;
