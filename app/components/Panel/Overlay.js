import styled from 'styled-components';
import { Overlay as OfficeOverlay } from 'office-ui-fabric-react/lib/Overlay';

import theme from 'utils/theme';

const Overlay = styled(OfficeOverlay) `
  &.ms-Overlay {
    top: ${theme.hub.headerHeight}px;
    z-index: ${theme.zIndex.overlay};
  }
`;

export default Overlay;
