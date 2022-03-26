import React from 'react';

const Tweet = ({ tweet }) => {
  return (
    <>
      <strong>{tweet.text}</strong>
      <br />
      <small className="">{tweet.data}</small>
    </>
  );
};

export default Tweet;
