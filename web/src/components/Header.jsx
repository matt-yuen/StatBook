import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 32px;
  margin: 45px 0 45px 0;
  font-family: Comfortaa;
  width: 100%;
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