/**
*
* Apps
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import routes from 'containers/AppHub/routes';
import theme from 'utils/theme';

import AppTile from './AppTile';

const Wrapper = styled.div`
  padding: 15px;
  background: ${theme.themeDarker};
  height: 100%;
`;

class Apps extends React.PureComponent {
  render() {
    return (
      <Wrapper>
        {
          routes.map((route) => (
            <AppTile key={route.key} route={route} onClick={this.props.onClick} />
          ))
        }
      </Wrapper>
    );
  }
}

Apps.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Apps;
