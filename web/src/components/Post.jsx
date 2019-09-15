import React from "react";
import styled from "styled-components";
import { Card, CardActionArea } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";

const useStyles = makeStyles({
  card: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "15px",
    margin: "10px 10px 10px 0",
  },
  postPicture: {
    width: "75px",
    height: "75px",
  },
});

const Link = styled.a`
  text-decoration: none;
`;

const PostContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 0 20px 0 0;
`;

const Message = styled.div`
  font-family: Comfortaa;
  font-size: 16px;
  width: 100%;
  padding: 0 0 20px 0;
`;

function Post(props) {
  const classes = useStyles();
  const { score } = props;
  let roundScore = Math.round(score*100);

  return (
    <Link href={props.link}>
      <CardActionArea>
        <Card className={classes.card}>
          <PostContent>
            <Message>{props.message}</Message>
            {roundScore > 0 && <Progress percent={roundScore} />}
          </PostContent>
          <img className={classes.postPicture} src={props.pic} alt="Post pic" />
        </Card>
      </CardActionArea>
    </Link>
  );
}

export default Post;
