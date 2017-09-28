import styled from 'styled-components';

import theme from 'utils/theme';

const Content = styled.div`
  background: ${theme.neutralLighter};
  bottom: 0;
  ${(props) => props.left ? 'left' : 'right'}: 0;
  position: absolute;
  width: 350px;
  height: calc(100vh - ${theme.hub.headerHeight});
  border-${(props) => props.left ? 'right' : 'left'}: 1px solid ${theme.themeLight};
  box-sizing: border-box;
  cursor: default;
`;

export default Content;
