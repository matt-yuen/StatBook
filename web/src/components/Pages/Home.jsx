import React from 'react';
import Header from '../Header.jsx'

function Home(props) {
  return (
    <Header loginResponse={props.location.state} />
  )
}

export default Home