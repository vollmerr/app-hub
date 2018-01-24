import styled from 'styled-components';

import theme from 'utils/theme';

const Wrapper = styled.div`
  display: ${(props) => props.isMobile ? 'none' : 'block'};
  flex: 0 0 ${theme.app.navWidth}px;
  background: ${theme.neutralLight};
  height: 100vh;
`;

export default Wrapper;
