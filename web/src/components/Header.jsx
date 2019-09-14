import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
<<<<<<< HEAD
  font-size: 32px;
  margin: 45px 0 45px 0;
  font-family: Comfortaa;
  width: 100%;
=======
  font-size: 24px;
  margin-top: 35px;
  font-family: Comfortaa;
>>>>>>> 96a049ba73a9ffc4086e1b738a3e7d79712308ce
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