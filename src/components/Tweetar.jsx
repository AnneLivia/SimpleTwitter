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
  const [tweet, setTweet] = useState({
    text: '',
    data: '',
  });

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
              data: new Date().toLocaleString(),
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

            // Creating a callback, that get all data from this state, and append it with the new tweet
            setTweets((preTweets) => {
              return [tweet, ...preTweets];
            });

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
