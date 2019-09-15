import React from 'react';
import styled from 'styled-components';
import Header from '../Header.jsx';
import ProfileCard from '../ProfileCard.jsx';
import ReactionCard from '../ReactionCard.jsx';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content:center;
  align-items:row;
  width: 100%;
`;

const TopLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
`;

const TopRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
`;

const ReactionAndPostCardWrapper = styled.div`
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
      <TopContainer>
        <TopLeftContainer>
          <ProfileCard />
          <ReactionAndPostCardWrapper>
            <ReactionCard />
          </ReactionAndPostCardWrapper>
        </TopLeftContainer>
        <TopRightContainer />
      </TopContainer>
    </HomeContainer>
  )
}

export default Home