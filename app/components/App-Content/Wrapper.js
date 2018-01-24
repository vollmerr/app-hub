import styled from 'styled-components';

import theme from 'utils/theme';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  min-height: calc(100vh - ${theme.hub.headerHeight}px);
`;

export default Wrapper;
