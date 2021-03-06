import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Post from './Post.jsx'

const useStyles = makeStyles({
  card: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px 0 0 7px',
    margin: '0 0 15px 10px',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
  },
});

const Title = styled.div`
  font-family: Comfortaa;
  font-size: 22px;
  width: 100%;
  padding-bottom: 20px;
  font-weight: bold;
`;

const Posts = styled.div`
  width: 100%;
  max-height: 375px;
  overflow: scroll;
  overflow-x: hidden;
`;

const getPosts = (data, sentiments) => {
  console.log(sentiments);
  return data.map((post, i) => {
    let score = sentiments[i];
    if (post.message)
      return <Post key={i} message={post.message} pic={post.picture} link={post.permalink_url} score={score} />;
    
    return <React.Fragment key={i} />;
  })
}

function PostsCard() {
  const [data, setData] = useState({});
  const [sentiments, setSentiments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const classes = useStyles();
  
  useEffect(() => {
    axios.get('https://graph.facebook.com/'+ process.env.REACT_APP_PAGE_ID + '/posts?fields=id,message,comments', {
      headers: {
        Authorization: 'Bearer ' + process.env.REACT_APP_PAGE_ACCESS_TOKEN,
      }
    })
    .then(response => {
      axios.post('https://thawing-fjord-78969.herokuapp.com/posts', response.data.data)
      .then(function (response) {
        let sentiments = response.data.sentiments;

        let scores = [];
        for (const sentiment of sentiments) {
          scores.push(sentiment.sentimentScore);
        }
        console.log(scores);
        setSentiments(scores);
      })
      .catch(function (error) {
        console.log(error);
      });
    })
    .catch(error => {
      console.log(error);
    });

    axios.get('https://graph.facebook.com/'+ process.env.REACT_APP_PAGE_ID + '/posts?fields=message,picture,permalink_url', {
      headers: {
        Authorization: 'Bearer ' + process.env.REACT_APP_PAGE_ACCESS_TOKEN,
      }
    })
    .then(response => {
      setData(response.data.data);
      // console.log(response.data.data);
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
              <Posts>
                {getPosts(data, sentiments)}
              </Posts>
            </React.Fragment>
        }
      </CardContent>
    </Card>
  )
}

export default PostsCard