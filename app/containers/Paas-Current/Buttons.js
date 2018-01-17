import styled from 'styled-components';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';

import theme from 'utils/theme';


export const ApproveButton = styled(ActionButton)`
  height: 30px;

  i {
    color: ${theme.green};
  }
`;


export const DenyButton = styled(ActionButton)`
  height: 30px;

  i {
    color: ${theme.red};
  }
`;
