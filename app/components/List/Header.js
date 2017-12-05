import styled from 'styled-components';

import theme from 'utils/theme';

const Header = styled.div`
  flex: 1 ${theme.list.headerHeight};
  display: flex;
  padding: 5px 5px 15px 5px;
  min-height: ${theme.list.headerHeight};
`;

export default Header;
