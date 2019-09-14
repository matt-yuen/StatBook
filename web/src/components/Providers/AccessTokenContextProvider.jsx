import React, { createContext, useState } from 'react';

export const AccessTokenContext = createContext({
  accessToken: '',
  setAccessToken: () => {},
});

export const AccessTokenContextProvider = props => {
  const setAccessToken = accessToken => {
    setState({ ...state, accessToken: accessToken });
  };

  const initState = {
    accessToken: 'TESTING',
    setAccessToken: setAccessToken,
  };

  const [state, setState] = useState(initState);

  return (
    <AccessTokenContext.Provider value={state}>
      {props.children}
    </AccessTokenContext.Provider>
  )
}
