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

// width: ${(props) => props.isMobile ? '350px' : `calc(6 * ${theme.hub.tileSize} + 10 * 3px)`}; // 6 * width of app tile + space between for all but 2 ends
const Wrapper = styled.div`
  width: 100%;
  max-width: calc(6 * ${theme.hub.tileSize} + 10 * 3px);
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
