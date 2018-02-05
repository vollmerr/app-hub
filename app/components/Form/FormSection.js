import styled, { css } from 'styled-components';

import theme from '../../utils/theme';


const FormSection = styled.form`
  margin: ${theme.hub.padding}px;
  padding: ${theme.hub.padding}px;
  background: ${theme.white};
  box-shadow: 0 0 3px ${theme.neutralLight};

  ${(props) => css`
    min-height: 350px;
    height: calc(
      ${100 / props.count}vh - \
      ${theme.hub.headerHeight / props.count}px - \
      ${props.padding / props.count}px - \
      ${theme.hub.padding}px
    );
  `}
`;


FormSection.defaultProps = {
  noValidate: true,
  count: 1,
  padding: theme.hub.padding,
};


export default FormSection;
