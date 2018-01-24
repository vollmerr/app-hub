import styled from 'styled-components';

import theme from 'utils/theme';

const AppContent = styled.div`
  display: flex;
  flex: 1;
  background-color: ${theme.neutralLighterAlt};
  height: calc(100vh - ${theme.hub.headerHeight}px);
  overflow-y: auto;
  overflow-x: hidden;
`;

export default AppContent;
