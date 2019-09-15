import React from 'react';
import styled from 'styled-components';
import { Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  card: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '15px',
    margin: '10px 10px 10px 0',
  },
  postPicture: {
    width: '75px',
    height: '75px',
  },
})

const Message = styled.div`
  font-family: Comfortaa;
  font-size: 16px;
  width: 100%;
  padding: 0 15px 20px 0;
`;

function Post(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card} >
      <Message>{props.message}</Message>
      <img 
        className={classes.postPicture} 
        src={props.pic}
        alt="Post pic"
      />
    </Card>
  );
}

export default Post