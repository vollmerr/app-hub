
import styled from 'styled-components';

import theme from 'utils/theme';

const AppContent = styled.div`
  display: flex;
  flex: 1;
  padding: 0 15px;
  background-color: ${theme.neutralLighterAlt};
  height: 100vh;
  overflow: auto;
`;

export default AppContent;
