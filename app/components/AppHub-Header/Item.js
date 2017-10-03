import styled from 'styled-components';

import theme from 'utils/theme';

const focusStyle = (props) => `
  color: ${props.dark ? theme.white : theme.themeDark};
  background: ${props.dark ? theme.themeDark : theme.themeLighter};
  border-bottom: 2px solid ${props.dark ? theme.orange : theme.orangeLighter};
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  height: ${theme.hub.headerHeight};
  border-bottom: 2px solid transparent;

  ${(props) => props.isLink &&
    `&:hover,
    &:active,
    &:focus {
      ${focusStyle(props)}
    }`
  }
  ${(props) => props.checked &&
    focusStyle(props)
  }
`;

export default Item;
