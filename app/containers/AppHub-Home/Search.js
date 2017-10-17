/**
*
* Apps
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import styled from 'styled-components';

import theme from 'utils/theme';

const numApps = 6; // UPDATE THIS TO HOW MANY APPS SHOULD BE DISPLAYED ON HOMESCREEN
export const Wrapper = styled.div`
  width: 100%;
  max-width: calc(${numApps} * ${theme.hub.tileSize} + ${(numApps - 1) * 2} * 3px);
  background: ${theme.white};
`;

class Search extends React.PureComponent {
  render() {
    return (
      <Wrapper>
        <SearchBox
          onChange={this.props.onChange}
        />
      </Wrapper>
    );
  }
}

Search.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default Search;
