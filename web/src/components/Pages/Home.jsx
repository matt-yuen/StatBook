import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 24px;
`;

const WelcomeMessage = styled.div`;
`;

const Logo = styled.div`
`;

function Home() {
  return (
    <Header>
      <WelcomeMessage>
        Welcome back!
      </WelcomeMessage>
      <Logo>
        StatBook
      </Logo>
    </Header>
  )
}

export default Home