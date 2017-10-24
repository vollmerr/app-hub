import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import theme from 'utils/theme';

import AppTile from './AppTile';

export const Wrapper = styled.div`
  padding: 15px;
  background: ${theme.themeDarker};
  height: 100%;
`;

class Apps extends React.PureComponent {
  render() {
    const { routes, onClick } = this.props;
    return (
      <Wrapper>
        {
          routes.map((route) => (
            <AppTile key={route.key} route={route} onClick={onClick} />
          ))
        }
      </Wrapper>
    );
  }
}

Apps.propTypes = {
  onClick: PropTypes.func.isRequired,
  routes: PropTypes.array.isRequired,
};

export default Apps;
