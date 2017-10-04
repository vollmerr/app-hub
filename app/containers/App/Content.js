
import styled from 'styled-components';

import theme from 'utils/theme';

const Content = styled.div`
  display: flex;
  flex: 1;
  padding: 0 ${(props) => props.isMobile ? '15px' : '30px'};
  background-color: ${theme.neutralLighterAlt};
`;

export default Content;
