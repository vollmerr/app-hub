import styled from 'styled-components';

import theme from 'utils/theme';

const Line = styled.div`
  width: 1px;
  margin: auto;
  background: ${theme.themeLight};
  height: ${props => props.partial ? `calc(${theme.hub.headerHeight} - 15px)` : `calc(${theme.hub.headerHeight} - 2px)`};
`;

export default Line;
