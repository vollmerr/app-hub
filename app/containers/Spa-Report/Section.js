import styled from 'styled-components';

import theme from 'utils/theme';


const Section = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: calc(${theme.breakpoints.xs}px - 40px);
  min-height: 100%;
`;

export default Section;
