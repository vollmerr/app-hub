
import styled from 'styled-components';

import theme from 'utils/theme';

const AppContent = styled.div`
  display: flex;
  flex: 1;
  padding: 0 15px;
  background-color: ${theme.neutralLighterAlt};
  height: calc(100vh - ${theme.hub.headerHeight});
  overflow: auto;
`;

export default AppContent;
