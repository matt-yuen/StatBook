import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 24px;
  margin-top: 35px;
  font-family: Comfortaa;
`;

const Logo = styled.div`
`;

function Header(props) {
  return (    
    <HeaderContainer>
      <div>
        Welcome back, {props.loginResponse.name}!
      </div>
      <Logo>
        StatBook
      </Logo>
    </HeaderContainer>
  )
}

export default Header