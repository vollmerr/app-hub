import styled from 'styled-components';

import theme from 'utils/theme';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: ${theme.hub.headerHeight};
  border-bottom: 2px solid ${theme.yellow};
  box-sizing: border-box;
`;

export default Wrapper;
