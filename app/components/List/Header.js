import styled from 'styled-components';

import theme from 'utils/theme';

const Header = styled.div`
  display: flex;
  flex: 1;
  padding: 5px 5px 15px 5px;
  height: ${theme.list.headerHeight};
`;

export default Header;
