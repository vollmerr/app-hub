import styled from 'styled-components';

import theme from 'utils/theme';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100%;
  margin-top: -${theme.hub.headerHeight}px;
`;

export default Wrapper;

