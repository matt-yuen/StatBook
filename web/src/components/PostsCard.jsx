import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  card: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px 0 10px 7px',
    margin: '0 0 0 10px',
  },
  cardContent: {
    display: 'flex',
  },
});

const Title = styled.div`
  font-family: Comfortaa;
  font-size: 22px;
  width: 100%;
  padding-bottom: 20px;
  font-weight: bold;
`;

function PostsCard() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const classes = useStyles();
  
  useEffect(() => {
    axios.get('https://graph.facebook.com/'+ process.env.REACT_APP_PAGE_ID + '?fields=name,picture{url},engagement,talking_about_count', {
      headers: {
        Authorization: 'Bearer ' + process.env.REACT_APP_PAGE_ACCESS_TOKEN,
      }
    })
    .then(response => {
      setData(response.data);
      setIsLoading(false);
    })
    .catch(error => {
      console.log(error);
    });
  }, [])

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        { isLoading
          ? <Title>Loading content...</Title>
          : <React.Fragment>
              <Title>Posts</Title>
            </React.Fragment>
        }
      </CardContent>
    </Card>
  )
}

export default PostsCard