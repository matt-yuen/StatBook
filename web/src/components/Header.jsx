import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 32px;
  margin: 35px 0 40px 0;
  font-family: Comfortaa;
  width: 100%;
`;

const WelcomeMessage = styled.div`
  display: flex;
  flex-direction: row;
`;

const Logo = styled.div``;

const Name = styled.div`
  color: #0033cc;
  font-weight: bold;
`;

function Header(props) {
  return (    
    <HeaderContainer>
      <WelcomeMessage>
        Welcome back,&nbsp;<Name>{props.loginResponse.name}</Name>!
      </WelcomeMessage>
      <Logo>
        <img 
          src={require('../images/logo.png')}
          alt="Logo"
          width="250"
          height="95"
        />
      </Logo>
    </HeaderContainer>
  )
}

export default Header