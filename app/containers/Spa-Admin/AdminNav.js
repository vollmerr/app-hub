import styled from 'styled-components';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';


/**
 * Top navbar for Admin functionality
 */
const AdminNav = styled(CommandBar) `
  &.ms-CommandBar {
    margin: 0 -15px;
  }
`;

export default AdminNav;
