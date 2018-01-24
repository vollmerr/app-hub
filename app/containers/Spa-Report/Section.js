import styled from 'styled-components';

import theme from 'utils/theme';


const Section = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 300px;

  @media (min-width: ${theme.breakpoints.sm}px) {
    min-width: ${theme.breakpoints.sm - 40}px;
  }
`;

export default Section;
