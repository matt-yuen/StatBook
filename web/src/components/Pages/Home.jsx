import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 24px;
  margin-top: 35px;
  font-family: Comfortaa;
`;

const WelcomeMessage = styled.div`;
`;

const Logo = styled.div`
`;

function Home(props) {
  return (
    <Header>
      <WelcomeMessage>
        Welcome back, {props.location.state.name}!
      </WelcomeMessage>
      <Logo>
        StatBook
      </Logo>
    </Header>
  )
}

export default Home