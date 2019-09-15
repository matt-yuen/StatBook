import React from 'react';
import styled from 'styled-components';
import Header from '../Header.jsx';
import ProfileCard from '../ProfileCard.jsx';
import ReactionCard from '../ReactionCard.jsx';
import PostsCard from '../PostsCard.jsx';
import SuggestionCard from '../SuggestionCard.jsx';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
`;

const TopLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  margin: 0 15px 0 0;
`;

const TopRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
`;

function Home(props) {
  return (
    <HomeContainer>
      <Header loginResponse={props.location.state} />
      <TopContainer>
        <TopLeftContainer>
          <ProfileCard />
          <ReactionCard />
        </TopLeftContainer>
        <TopRightContainer>
          <PostsCard />
          <SuggestionCard />
        </TopRightContainer>
      </TopContainer>
    </HomeContainer>
  )
}

export default Home