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

const numApps = 5; // UPDATE THIS TO HOW MANY APPS SHOULD BE DISPLAYED ON HOMESCREEN
const Wrapper = styled.div`
  width: 100%;
  max-width: calc(${numApps} * ${theme.hub.tileSize} + ${numApps * 2} * 3px);
  background: ${theme.white};
`;

class Search extends React.PureComponent {
  render() {
    return (
      <Wrapper>
        <SearchBox
          onFocus={() => console.log('onFocus called')}
          onBlur={() => console.log('onBlur called')}
        />
      </Wrapper>
    );
  }
}

Search.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Search;
