import styled from 'styled-components';

import theme from 'utils/theme';


const StyledForm = styled.form`
  min-height: calc(${(props) => props.vh}vh - ${theme.hub.headerHeight} - 30px - ${(props) => props.margin});
  padding: 15px;
  margin: 15px 0;
  background: ${theme.white};
`;

StyledForm.defaultProps = {
  noValidate: true,
  vh: 100,
  margin: '0px',
};

export default StyledForm;
