import styled from 'styled-components';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';

import theme from 'utils/theme';

/**
 * Top navbar for Admin functionality
 */
const AdminNav = styled(CommandBar) `
  &.ms-CommandBar {
    margin: 0 -15px;
    border-bottom: 1px solid ${theme.neutralLight};
  }
`;

export default AdminNav;
