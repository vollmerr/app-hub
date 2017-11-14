import styled from 'styled-components';

import theme from 'utils/theme';


const Form = styled.form`
  min-height: calc(${(props) => props.vh || 100}vh - ${theme.hub.headerHeight} - 30px - ${(props) => props.margin || 0}px);
  padding: 15px;
  margin: 15px 0;
  background: ${theme.white};
`;

export default Form;
