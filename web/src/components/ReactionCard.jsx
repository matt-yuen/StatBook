import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  card: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
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

function ReactionCard() {
  const initState = {
    likeSum: 0,
    loveSum: 0,
    hahaSum: 0,
    wowSum: 0,
    sadSum: 0,
    angrySum: 0,
  }
  const [data, setData] = useState(initState);
  const [isLoading, setIsLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    axios.get('https://graph.facebook.com/'+ process.env.REACT_APP_PAGE_ID +
    `/posts?fields=reactions.type(LIKE).limit(0).summary(total_count).as(reactions_like)
    ,reactions.type(LOVE).limit(0).summary(total_count).as(reactions_love)
    ,reactions.type(HAHA).limit(0).summary(total_count).as(reactions_haha)
    ,reactions.type(WOW).limit(0).summary(total_count).as(reactions_wow)
    ,reactions.type(SAD).limit(0).summary(total_count).as(reactions_sad)
    ,reactions.type(ANGRY).limit(0).summary(total_count).as(reactions_angry)`, {
      headers: {
        Authorization: 'Bearer ' + process.env.REACT_APP_PAGE_ACCESS_TOKEN,
      }
    })
    .then(response => {
      let newState = {
        likeSum: data.likeSum,
        loveSum: data.loveSum,
        hahaSum: data.hahaSum,
        wowSum: data.wowSum,
        sadSum: data.sadSum,
        angrySum: data.angrySum,
      };

      response.data.data.forEach(post => {
        newState = {
          loveSum: newState.loveSum + post.reactions_love.summary.total_count,
          hahaSum: newState.hahaSum + post.reactions_haha.summary.total_count,
          wowSum: newState.wowSum + post.reactions_wow.summary.total_count,
          sadSum: newState.sadSum + post.reactions_sad.summary.total_count,
          angrySum: newState.angrySum + post.reactions_angry.summary.total_count,
          likeSum: newState.likeSum + post.reactions_like.summary.total_count,
        }
      });

      setData(newState);
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
              <Title>Reactions</Title>
            </React.Fragment>
        }
      </CardContent>
    </Card>
  )
}

export default ReactionCard
