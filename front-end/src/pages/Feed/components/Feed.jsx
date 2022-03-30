import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import Tweet from './Tweet';

const styles = {
  CardHeader: {
    color: 'white',
    fontWeight: 800,
    textAlign: 'center',
    backgroundColor: 'rgb(76, 146, 252)',
  },
};

const removeTweet = async (id, token) => {
  const response = await fetch(`http://localhost:4000/api/tweets/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  // if 200, then remove it from state
  return response.status;
};

const Feed = ({ tweets, setTweets, token, userLoggedEmail }) => {
  return (
    <Card border="primary">
      <Card.Header style={styles.CardHeader}>
        <Card.Title>My Tweets</Card.Title>
      </Card.Header>

      <Card.Body>
        {
          // map with callback
          tweets.map((tweet) => {
            // console.log(tweet.id);
            return (
              <Row key={tweet.id} className="p-3 border-bottom mb-4">
                <Col md={11} xs={10}>
                  <Card.Text>
                    <Tweet tweet={tweet} />
                  </Card.Text>
                </Col>
                {
                  // just render this button, if logged user email is the same as the one who tweet this
                  tweet.email === userLoggedEmail && (
                    <Col md={1} xs={2}>
                      <Button
                        id={tweet.id}
                        onClick={async (event) => {
                          // removing from db using api
                          const status = await removeTweet(
                            event.target.id,
                            token
                          );
                          return setTweets(
                            // overwriting data with all of the tweets apart from deleted
                            // only if 200 status code.
                            tweets.filter((value) => {
                              if (status === 200)
                                return value.id !== event.target.id;

                              return value.id;
                            })
                          );
                        }}
                        // console.log(event.target.id);
                        variant="danger"
                      >
                        X
                      </Button>
                    </Col>
                  )
                }
              </Row>
            );
          })
        }
      </Card.Body>
    </Card>
  );
};

export default Feed;
