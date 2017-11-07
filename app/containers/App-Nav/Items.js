import styled from 'styled-components';
import { Nav } from 'office-ui-fabric-react/lib/Nav';

import theme from 'utils/theme';

const Items = styled(Nav) `
  background: ${(props) => props.isMobile ? theme.neutralPrimary : theme.neutralLight};
  * {
    transition: none;
  }

  li > div {
    background: ${(props) => props.isMobile ? theme.neutralPrimary : theme.neutralLight};

    button {
      text-decoration: none;
      display: block;
      color: ${(props) => props.isMobile ? theme.white : 'inherit'};

      &:hover,
      &:focus,
      &:active {
        color: ${(props) => props.isMobile ? theme.neutralDark : 'inherit'};
        background: ${(props) => props.isMobile ? theme.neutralLighter : theme.neutralTertiaryAlt};
      }
    }

    &:hover button,
    &.is-selected button {
      background: ${(props) => props.isMobile ? theme.neutralLighter : theme.neutralTertiaryAlt};
    }
  }
`;

export default Items;
