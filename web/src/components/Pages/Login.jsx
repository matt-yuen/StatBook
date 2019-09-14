import React from "react";
import styled from 'styled-components';
import FacebookLogin from 'react-facebook-login';
import { withRouter } from 'react-router-dom';

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

function Login(props) {
  const responseFacebook = (response) => {
    console.log(response);
    props.history.push('/home');
  }

  return (
    <LoginContainer>
      <Logo>
        StatBook
      </Logo>
      <FacebookLogin
        appId="402369167087579"
        autoLoad={false}
        fields="name,email,picture"
        scope="public_profile,user_posts"
        icon="fa-facebook-square fa-lg"
        callback={responseFacebook} 
        textButton="Log in"
        version="4.0"
      />
    </LoginContainer>
  )
}

export default withRouter(Login)
