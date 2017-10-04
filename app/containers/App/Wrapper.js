
import styled from 'styled-components';

import theme from 'utils/theme';

const Wrapper = styled.div`
  display: ${(props) => props.isMobile ? 'none' : 'block'};
  flex: 0 0 ${theme.app.navWidth};
  background: ${theme.neutralLight};
`;

export default Wrapper;
