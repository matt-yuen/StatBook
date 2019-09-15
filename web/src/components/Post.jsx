import React from 'react';
import styled from 'styled-components';
import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

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

const PostContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

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
      <PostContent>
        <Message>{props.message}</Message>
      </PostContent>
      <img 
        className={classes.postPicture} 
        src={props.pic}
        alt="Post pic"
      />
    </Card>
  );
}

export default Post