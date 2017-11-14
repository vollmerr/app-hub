import styled from 'styled-components';

import theme from 'utils/theme';


const Form = styled.form`
  min-height: calc(${(props) => props.vh}vh - ${theme.hub.headerHeight} - 30px - ${(props) => props.margin});
  padding: 15px;
  margin: 15px 0;
  background: ${theme.white};
`;

Form.defaultProps = {
  noValidate: true,
  vh: 100,
  margin: 0,
};

export default Form;
