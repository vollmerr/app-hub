import styled from 'styled-components';

import theme from 'utils/theme';
import Section from 'components/App-Content/Section';

/**
 * Contianer section of SPA Home for acknowlegment lists
 */
const AckSection = styled(Section) `
  height: calc(50vh - ${theme.hub.headerHeight});
  overflow: hidden;

  .ms-Viewport {
    overflow: auto;
    height: calc(50vh - ${theme.hub.headerHeight} - ${theme.list.headerHeight} - 15px)
  }

  .ms-DetailsList {
    overflow: visible;
  }

  .ms-DetailsRow-fields,
  .ms-DetailsHeader-cell {
    cursor: pointer;
  }
`;

export default AckSection;
