/**
*
* Apps
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import AppTile from 'components/AppHub-Panel/AppTile';

export const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  height: 102px;
  overflow: hidden;
  width: 100%;
  margin-top: 30px;
`;


class Apps extends React.PureComponent {
  render() {
    return (
      <Wrapper>
        {
          this.props.routes.map((route) => (
            <AppTile key={route.key} route={route} />
          ))
        }
      </Wrapper>
    );
  }
}

Apps.propTypes = {
  routes: PropTypes.array.isRequired,
};

export default Apps;
