import { css } from 'styled-components';

import theme from '../../utils/theme';

import Section from '../Layout/Section';


const FormSection = Section.extend`
  padding: ${theme.hub.padding}px;

  ${(props) => css`
    min-height: 350px;
    height: calc(
      ${100 / props.count}vh - \
      ${theme.hub.headerHeight / props.count}px - \
      ${props.padding / props.count}px - \
      ${theme.hub.padding}px
    );
  `}
`.withComponent('form');


FormSection.defaultProps = {
  noValidate: true,
  count: 1,
  padding: theme.hub.padding,
};


export default FormSection;
