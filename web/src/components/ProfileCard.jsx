import React, { useState, useEffect} from 'react';
import axios from 'axios';
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
    margin: '0 0 15px 0',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  profilePicture: {
    width: '100%',
    height: '100%',
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
  font-family: Comfortaa;
  font-size: 18px;
  width: 100%;
`;

const ProfilePicture = styled.div`
  min-width: 100px;
  min-height: 100px;
  width: 100px;
  height: 100px;
  margin: 0 20px 0 0;
`;

const StatisticsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Statistic = styled.div`
  padding: 0 0 10px 0;
`;

function ProfileCard() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const classes = useStyles();
  
  useEffect(() => {
    axios.get('https://graph.facebook.com/'+ process.env.REACT_APP_PAGE_ID + '?fields=name,picture{url},fan_count,engagement,talking_about_count', {
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
              <Title>Profile</Title>
              <Body>
                <ProfilePicture>
                  <img
                    className={classes.profilePicture} 
                    src={data.picture.data.url}
                    alt="Profile pic"
                  />
                </ProfilePicture>
                <StatisticsWrapper>
                  <Statistic><b>Name:</b> {data.name}</Statistic>
                  <Statistic><b>Followers :</b> {data.fan_count}</Statistic>
                  <Statistic><b>Engagement count:</b> {data.engagement.count}</Statistic>
                  <Statistic><b>Mentions:</b> {data.talking_about_count}</Statistic>
                </StatisticsWrapper>
              </Body>
            </React.Fragment>
        }
      </CardContent>
    </Card>
  )
}

export default ProfileCard
