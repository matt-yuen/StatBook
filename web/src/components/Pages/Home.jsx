import React from 'react';
import styled from 'styled-components';
import Header from '../Header.jsx'
import ProfileCard from '../ProfileCard.jsx'
import ReactionCard from '../ReactionCard.jsx'

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

function Home(props) {
  return (
    <HomeContainer>
      <Header loginResponse={props.location.state} />
      <ProfileCard />
      <ReactionCard />
    </HomeContainer>
  )
}

export default Home