import React from "react";
import styled from 'styled-components';
import FacebookLogin from 'react-facebook-login';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70%;
`;

const Logo = styled.div`
  font-size: 56px;
  padding-bottom: 20px;
`;

const responseFacebook = (response) => {
  console.log(response);
}

function Login() {
  return (
    <LoginContainer>
      <Logo>
        StatBook
      </Logo>
      <FacebookLogin
        appId="402369167087579"
        autoLoad={false}
        fields="name,email,picture"
        icon="fa-facebook-square fa-lg"
        // onClick={componentClicked}
        callback={responseFacebook} 
        textButton="Log in"
        version="4.0"
      />
    </LoginContainer>
  )
}

export default Login