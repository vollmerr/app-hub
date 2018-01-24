import React from 'react';
import styled from 'styled-components';

import List from 'components/List';
import theme from 'utils/theme';


export const StyledList = styled(List)`
  flex: 1;
  margin: ${theme.hub.padding / 2}px;
`;


class Authorizations extends React.PureComponent {
  render() {
    return (
      <StyledList {...this.props} />
    );
  }
}


export default Authorizations;
