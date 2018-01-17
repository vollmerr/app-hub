import React from 'react';
import styled from 'styled-components';

import theme from 'utils/theme';
import ListSection from 'components/List/ListSection';
import List from 'components/List';


export const Wrapper = styled(ListSection) `
  flex: 1;
  margin: 5px;
  height: auto;
  max-height: calc(100vh - ${theme.app.subNavHeight} - 20px);
`;

const halfHeight = {
  vh: 50,
  margin: 18, // section margin (15) + 3 due to being in div (margin outside div)
};


class Authorizations extends React.PureComponent {
  render() {
    return (
      <Wrapper {...halfHeight}>
        <List {...this.props} />
      </Wrapper>
    );
  }
}

export default Authorizations;
