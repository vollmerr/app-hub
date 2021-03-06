import React from 'react';
import PropTypes from 'prop-types';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import styled from 'styled-components';

import theme from '../../../utils/theme';


export const Wrapper = styled.div`
  width: 80%;
  max-width: calc(${theme.hub.numApps} * ${theme.hub.tileSize}px + ${(theme.hub.numApps - 1) * 2} * 3px);
  background: ${theme.white};
`;


class Search extends React.PureComponent {
  render() {
    return (
      <Wrapper>
        <SearchBox onChange={this.props.onChange} />
      </Wrapper>
    );
  }
}


const { func } = PropTypes;

Search.propTypes = {
  onChange: func.isRequired,
};


export default Search;
