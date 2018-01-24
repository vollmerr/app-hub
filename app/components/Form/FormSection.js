import { css } from 'styled-components';

import theme from 'utils/theme';
import Section from 'components/App-Content/Section';


const FormSection = Section.withComponent('form').extend`
  margin: ${theme.hub.padding}px;
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
