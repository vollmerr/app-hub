import { injectGlobal } from 'styled-components';
import theme from 'utils/theme';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body,
  #app {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  /* OFFICE UI DIALOG (requires classname to be passed, ignores styled compoents...) */
  .ms-Dialog-main {
    min-width: ${theme.breakpoints.xs - 90}px !important;
    @media (min-width: ${theme.breakpoints.sm}px) {
      min-width: ${theme.breakpoints.sm - 90}px !important;
    }
  }
`;
