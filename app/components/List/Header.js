import styled from 'styled-components';

import theme from 'utils/theme';

const Header = styled.div`
  flex: 1 ${theme.list.headerHeight}px;
  display: flex;
  padding: 5px 0;
  height: ${theme.list.headerHeight}px;
`;

export default Header;
