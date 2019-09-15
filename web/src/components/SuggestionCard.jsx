import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  card: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: "10px 0 0px 7px",
    margin: "0 0 0 10px",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
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
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    axios
      .get(
        "https://graph.facebook.com/" +
          process.env.REACT_APP_PAGE_ID +
          "/posts?fields=id,message,comments",
        {
          headers: {
            Authorization: "Bearer " + process.env.REACT_APP_PAGE_ACCESS_TOKEN,
          },
        },
      )
      .then(response => {
        axios
          .post(
            "https://thawing-fjord-78969.herokuapp.com/posts",
            response.data.data,
          )
          .then(function(response) {
            let topics = response.data.suggestedTopics;
            topics = topics.join(', ');
            setSuggestions(topics);
            setIsLoading(false);
          })
          .catch(function(error) {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  });

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        { isLoading
          ? <Title>Loading content...</Title>
          : <React.Fragment>
              <Title>Suggestions</Title>
              <Suggestion>Your most popular posts were about: <b>{suggestions}</b>. Try to make more posts like this.</Suggestion>
            </React.Fragment>}
      </CardContent>
    </Card>
  );
}

export default SuggestionCard;
