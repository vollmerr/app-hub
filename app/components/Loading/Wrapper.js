import styled from 'styled-components';

import theme from 'utils/theme';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  > div {
    margin-top: -${theme.hub.headerHeight};
  }
`;

export default Wrapper;

