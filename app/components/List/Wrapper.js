import styled from 'styled-components';

import theme from 'utils/theme';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 10px;
  background: ${theme.white};

  .ms-DetailsRow-cell {
    color: ${theme.neutralPrimary};
  }
`;

export default Wrapper;
