import styled from 'styled-components';

import theme from 'utils/theme';
import Section from 'components/App-Content/Section';

/**
 * Contianer section for for lists
 */
const ListSection = styled(Section) `
  height: calc(${(props) => props.vh || 100}vh - ${theme.hub.headerHeight} - ${(props) => props.margin || 0}px);
  overflow: hidden;

  .ms-Viewport {
    overflow: auto;
    height: calc(${(props) => props.vh || 100}vh - ${theme.hub.headerHeight} - ${theme.list.headerHeight} - 15px)
  }

  .ms-DetailsList {
    overflow: visible;
  }

  .ms-DetailsRow-fields,
  .ms-DetailsHeader-cell {
    cursor: pointer;
  }
`;

export default ListSection;
