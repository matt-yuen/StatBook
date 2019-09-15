import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PieChart from 'react-minimal-pie-chart';

const useStyles = makeStyles({
  card: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px 0 10px 7px',
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

const Body = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-family: Comfortaa;
  font-size: 18px;
  width: 100%;
`;

const Legend = styled.div`
  display: flex;
  flex-direction: row;
  font-family: Comfortaa;
  font-size: 18px;
  align-items: center;
  justify-content: center;
  padding: 0 0 0 45px;
`;

const LegendValuesContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const LegendValue = styled.div`
  padding: 0 0 10px 0;
  font-family: Comfortaa;
  font-size: 18px;
`;

const LegendKeysContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px 0 0;
`;

const LegendKeyLike = styled.div`
  margin: 0 0 10px 0;
  font-family: Comfortaa;
  font-size: 18px;
  width: 20px;
  height: 20px;
  background-color: #6699ff;
`;

const LegendKeyLove = styled.div`
  margin: 0 0 10px 0;
  font-family: Comfortaa;
  font-size: 18px;
  width: 20px;
  height: 20px;
  background-color: #006699;
`;

const LegendKeyHaha = styled.div`
  margin: 0 0 10px 0;
  font-family: Comfortaa;
  font-size: 18px;
  width: 20px;
  height: 20px;
  background-color: #003399;
`;

const LegendKeyWow = styled.div`
  margin: 0 0 10px 0;
  font-family: Comfortaa;
  font-size: 18px;
  width: 20px;
  height: 20px;
  background-color: #0099ff;
`;

const LegendKeySad = styled.div`
  margin: 0 0 10px 0;
  font-family: Comfortaa;
  font-size: 18px;
  width: 20px;
  height: 20px;
  background-color: #000099;
`;

const LegendKeyAngry = styled.div`
  margin: 0 0 10px 0;
  font-family: Comfortaa;
  font-size: 18px;
  width: 20px;
  height: 20px;
  background-color: #000066;
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
              <Body>
                <PieChart
                  data={[{
                    title: '👍',
                    value: data.likeSum,
                    color: '#6699ff'
                  }, {
                    title: '❤️',
                    value: data.loveSum,
                    color: '#006699'
                  }, {
                    title: '😂',
                    value: data.hahaSum,
                    color: '#003399'
                  }, {
                    title: '😮',
                    value: data.wowSum,
                    color: '#0099ff'
                  }, {
                    title: '😢',
                    value: data.sadSum,
                    color: '#000099'
                  }, {
                    title: '😠',
                    value: data.angrySum,
                    color: '#000066'
                  }]}
                  animate
                />
                <Legend>
                  <LegendKeysContainer>
                    <LegendKeyLike />
                    <LegendKeyLove />
                    <LegendKeyHaha />
                    <LegendKeyWow />
                    <LegendKeySad />
                    <LegendKeyAngry />
                  </LegendKeysContainer>
                  <LegendValuesContainer>
                    <LegendValue>👍</LegendValue>
                    <LegendValue>️️️️️️️️️️️❤️</LegendValue>
                    <LegendValue>😂</LegendValue>
                    <LegendValue>😮</LegendValue>
                    <LegendValue>😢</LegendValue>
                    <LegendValue>😠</LegendValue>
                  </LegendValuesContainer>
                </Legend>
              </Body>
            </React.Fragment>
        }
      </CardContent>
    </Card>
  )
}

export default ReactionCard
