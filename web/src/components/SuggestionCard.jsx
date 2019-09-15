import React from 'react';
import styled from 'styled-components';
import { Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  card: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px 0 10px 7px',
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

const Suggestion = styled.div`
  font-family: Comfortaa;
  font-size: 16px;
  width: 100%;
  padding: 0 0 20px 0;  
`;

function SuggestionCard() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Title>
          Suggestions
        </Title>
        <Suggestion>TESTING 1</Suggestion>
      </CardContent>
    </Card>
  )
}

export default SuggestionCard