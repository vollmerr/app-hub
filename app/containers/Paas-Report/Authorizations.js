import React from 'react';
import styled from 'styled-components';

import ListSection from 'components/List/ListSection';
import List from 'components/List';


export const Wrapper = styled(ListSection) `
  flex: 1;
  margin: 5px;
`;

const halfHeight = {
  vh: 100,
  margin: 30, // 2*10 ouside section, 2*5 inside Wrapper
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
