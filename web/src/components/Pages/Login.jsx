import React from 'react';
import styled from 'styled-components';
import FacebookLogin from 'react-facebook-login';
import { withRouter } from 'react-router-dom';
import { AccessTokenContext } from '../Providers/AccessTokenContextProvider.jsx';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70%;
`;

const Logo = styled.div`
  font-family: Comfortaa;
  font-size: 56px;
`;

function Login(props) {
  return (    
    <AccessTokenContext.Consumer>
      {({ setAccessToken }) => {
        const responseFacebook = (response) => {
          setAccessToken(response.accessToken);
          props.history.push('/home', response);
        };
        
        return (
          <LoginContainer>
            <Logo>
              <img 
                src={require('../../images/logo.png')}
                alt="Logo"
                width="575"
                height="225"
              />
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
      }}
    </AccessTokenContext.Consumer>
  )
}

export default withRouter(Login)
