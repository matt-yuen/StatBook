import React from 'react';
import Reactions from '../Reactions';
import styled from 'styled-components';
import Header from '../Header.jsx'
import ProfileCard from '../ProfileCard.jsx'

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

function Home(props) {
  return (
    <HomeContainer>
      <Header loginResponse={props.location.state} />
      <ProfileCard />
    </HomeContainer>
  )
}

export default Home