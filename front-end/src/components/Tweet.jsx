import React from 'react';

const Tweet = ({ tweet }) => {
  return (
    <>
      <strong>{tweet.text}</strong>
      <br />
      <small>{tweet.name} - </small>
      <small className="">{tweet.date}</small>
    </>
  );
};

export default Tweet;
