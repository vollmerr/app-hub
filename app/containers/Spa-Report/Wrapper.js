import styled from 'styled-components';

import theme from 'utils/theme';


const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: ${theme.hub.padding / 2}px;

  min-height: calc(
    100vh - \
    ${theme.hub.headerHeight}px - \
    ${theme.app.subNavHeight}px
  );
`;

export default Wrapper;
