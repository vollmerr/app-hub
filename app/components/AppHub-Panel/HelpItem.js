import React from 'react';
import styled from 'styled-components';

import Link from 'components/Link';
import theme from 'utils/theme';

const Item = styled.li`
  list-style-type: none;
  margin: 0 -20px;

  &:hover {
    background: ${theme.neutralLighter};
  }
`;

const StlyedLink = styled(Link) `
  color: ${theme.themePrimary};
  display: block;
  padding: 15px;

  &:hover,
  &:active,
  &:focus {
    color: ${theme.themeDarker};
  }
`;

class HelpItem extends React.PureComponent {
  render() {
    return (
      <Item>
        <StlyedLink {...this.props} />
      </Item>
    );
  }
}

export default HelpItem;
