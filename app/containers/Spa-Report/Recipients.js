import React from 'react';
import styled from 'styled-components';

import List from 'components/List';
import theme from 'utils/theme';


export const StyledList = styled(List)`
  margin: ${theme.hub.padding / 2}px;
`;


const style = {
  padding: theme.app.subNavHeight + theme.hub.padding,
};


class Recipients extends React.PureComponent {
  render() {
    return (
      <StyledList {...this.props} style={style} />
    );
  }
}


export default Recipients;
