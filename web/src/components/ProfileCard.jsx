import React from 'react';
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

const ProfilePicture = styled.div`
  width: 100px;
  height: 100px;
`;

function ProfileCard() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Title>Profile</Title>
        <ProfilePicture>
          <img
            className={classes.profilePicture} 
            // src="https://upload.wikimedia.org/wikipedia/commons/3/34/PICA.jpg"
            src="https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2930485760299059&height=50&width=50&ext=1571091093&hash=AeTBph-5FL8vgUMN"
            alt="Profile pic"
          />
        </ProfilePicture>
      </CardContent>
    </Card>
  )
}

export default ProfileCard
