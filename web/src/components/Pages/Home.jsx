import React from 'react';
import styled from 'styled-components';
import Header from '../Header.jsx'
import ProfileCard from '../ProfileCard.jsx'
import ReactionCard from '../ReactionCard.jsx'

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const LeftRightWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content:center;
  align-items:row;
  width: 100%;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
`;

const ReactionsAndPostStateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

function Home(props) {
  return (
    <HomeContainer>
      <Header loginResponse={props.location.state} />
      <LeftRightWrapper>
        <LeftContainer>
          <ProfileCard />
          <ReactionsAndPostStateWrapper />
        </LeftContainer>
        <RightContainer />
      </LeftRightWrapper>
      <ReactionCard />
    </HomeContainer>
  )
}

export default Home