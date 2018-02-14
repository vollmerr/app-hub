import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { routeProp } from 'utils/propTypes';
import theme from 'utils/theme';

import AppTile from '../../../components/AppTile';


export const Wrapper = styled.div`
  padding: 15px;
  background: ${theme.themeDarker};
  height: 100%;
`;


class AppTiles extends React.PureComponent {
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


const { func, arrayOf } = PropTypes;

AppTiles.propTypes = {
  onClick: func.isRequired,
  routes: arrayOf(routeProp).isRequired,
};


export default AppTiles;
