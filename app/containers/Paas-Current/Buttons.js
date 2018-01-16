import styled from 'styled-components';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';

import theme from 'utils/theme';


export const ApproveButton = styled(ActionButton)`
  i {
    color: ${theme.green};
  }
`;


export const DenyButton = styled(ActionButton)`
  i {
    color: ${theme.red};
  }
`;
