import React, { useState } from 'react';
import { InputGroup, Button, FormControl } from 'react-bootstrap';

const styles = {
  InputGroupText: {
    backgroundColor: 'rgb(76, 146, 252)',
    color: '#fff',
  },

  TextArea: {
    readonly: true,
  },
};

const Tweetar = ({ setTweets, token }) => {
  const [tweet, setTweet] = useState({
    text: '',
    date: '',
    id: '',
  });

  const postTweetOnDB = async () => {
    const response = await fetch('http://localhost:4000/api/tweets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(tweet),
    });

    const data = await response.json();

    // Creating a callback, that get all data from this state, and append it with the new tweet
    setTweets((preTweets) => {
      return [{ ...tweet, id: data.tweet._id }, ...preTweets];
    });

    // console.log({ ...tweet, id: data.tweet._id });
  };

  return (
    <>
      <InputGroup className="mt-4 mb-4">
        <InputGroup.Text style={styles.InputGroupText}>Tweet</InputGroup.Text>
        <FormControl
          maxLength={280}
          as="textarea"
          placeholder="What are you feeling?"
          onChange={(event) =>
            setTweet({
              text: event.target.value,
              date: new Date().toLocaleString(),
            })
          }
          value={tweet.text}
        />
        <InputGroup.Text
          className={`bg-white ${
            tweet.text.length > 270
              ? 'text-danger'
              : tweet.text.length > 140
              ? 'text-warning'
              : 'text-dark'
          }`}
        >
          {tweet.text.length}
        </InputGroup.Text>

        <Button
          onClick={() => {
            // to go to the top, when a new tweet is added
            window.scrollTo(0, 0);

            postTweetOnDB();

            setTweet({ text: '', date: '' });
          }}
          variant="outline-primary"
        >
          Tweetar
        </Button>
      </InputGroup>
    </>
  );
};

export default Tweetar;
