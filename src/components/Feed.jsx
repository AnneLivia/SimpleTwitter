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

const Feed = ({ tweets, setTweets }) => {
  return (
    <Card border="primary">
      <Card.Header style={styles.CardHeader}>
        <Card.Title>My Tweets</Card.Title>
      </Card.Header>

      <Card.Body>
        {
          // map with callback
          tweets.map((tweet, index) => {
            return (
              <Row scroll={true} key={index} className="p-3 border-bottom mb-4">
                <Col md={11}>
                  <Card.Text>
                    <Tweet tweet={tweet} />
                  </Card.Text>
                </Col>
                <Col className="ms-4">
                  <Button
                    id={index}
                    onClick={(event) =>
                      setTweets(
                        // overwriting data with all of the tweets apart from deleted
                        tweets.filter(
                          (value, index) => index !== parseInt(event.target.id)
                        )
                      )
                    }
                    variant="danger"
                  >
                    X
                  </Button>
                </Col>
              </Row>
            );
          })
        }
      </Card.Body>
    </Card>
  );
};

export default Feed;
