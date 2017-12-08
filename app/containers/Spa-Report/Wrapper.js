import styled from 'styled-components';

import theme from 'utils/theme';


const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: calc(100vh - ${theme.hub.headerHeight} - ${theme.app.subNavHeight} - 20px);
  margin: 10px 0;
  width: 100%;
`;

export default Wrapper;
