/**
*
* AppPanel
*
*/

import React from 'react';
import styled from 'styled-components';

import AppHeader from 'components/App-Header/Loadable';

import { Link } from 'react-router-dom';
import { routes } from 'containers/Spa/Router';

// TODO: make more common (pass in routes), sperate into other files...
const Wrapper = styled.div`
padding: 15px;
a {
  display: block;
}
`;

const AppNav = () => (
  <div>
    {
      Object.values(routes).map((route) => (
        <Wrapper key={route.path}>
          <Link to={route.path} >{route.text}</Link>
        </Wrapper>
      ))
    }
  </div>
);

class AppPanel extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <AppHeader />
        <AppNav />
      </div>
    );
  }
}

AppPanel.propTypes = {

};

export default AppPanel;
