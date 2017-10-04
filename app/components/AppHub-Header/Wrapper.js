import styled from 'styled-components';

import theme from 'utils/theme';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: ${theme.hub.headerHeight};
  box-sizing: border-box;
  background: ${theme.neutralPrimary};
`;

export default Wrapper;
