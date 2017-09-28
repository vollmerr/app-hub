/**
*
* Apps
*
*/

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { routes } from 'containers/AppHub/Router';

const Wrapper = styled.div`
  padding: 15px;
  a {
    display: block;
  }
`;

class Apps extends React.PureComponent {
  render() {
    return (
      <div>
        {
          Object.values(routes).map((route) => (
            <Wrapper key={route.path} onClick={this.props.onClick}>
              <Link to={route.path} >{route.text}</Link>
            </Wrapper>
          ))
        }
      </div>
    );
  }
}

Apps.propTypes = {

};

export default Apps;
