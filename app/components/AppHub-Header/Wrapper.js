import styled from 'styled-components';

import theme from 'utils/theme';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: ${theme.hub.headerHeight}px;
  box-sizing: border-box;
  background: ${theme.neutralDark};
`;

export default Wrapper;
