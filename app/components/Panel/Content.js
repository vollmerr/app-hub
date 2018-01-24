import styled from 'styled-components';

import theme from 'utils/theme';

const Content = styled.div`
  background: ${theme.neutralPrimary};
  color: ${theme.white};
  font-size: 16px;
  bottom: 0;
  ${(props) => props.left ? 'left' : 'right'}: 0;
  position: absolute;
  width: ${theme.hub.panelWidth}px;
  height: calc(100vh - ${theme.hub.headerHeight}px);
  border-${(props) => props.left ? 'right' : 'left'}: 1px solid ${theme.neutralSecondary};
  box-sizing: border-box;
  cursor: default;
  z-index: ${theme.zIndex.panel};
`;

export default Content;
