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

const Tweetar = ({ setTweets }) => {
  const [tweet, setTweet] = useState('');

  return (
    <>
      <InputGroup className="mt-4 mb-4">
        <InputGroup.Text style={styles.InputGroupText}>Tweet</InputGroup.Text>
        <FormControl
          maxLength={280}
          as="textarea"
          placeholder="What are you feeling?"
          onChange={(event) => setTweet(event.target.value)}
          value={tweet}
        />
        <InputGroup.Text
          className={`bg-white ${
            tweet.length > 270
              ? 'text-danger'
              : tweet.length > 140
              ? 'text-warning'
              : 'text-dark'
          }`}
        >
          {tweet.length}
        </InputGroup.Text>
        <Button
          onClick={() => {
            // to go to the top, when a new tweet is added
            window.scrollTo(0, 0);

            // Creating a callback, that get all data from this state, and append it with the new tweet
            setTweets((preTweets) => {
              return [tweet, ...preTweets];
            });

            setTweet('');
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
