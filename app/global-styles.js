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

  * {
    transition: 0.1s ease;
  }

  .ms-Button * {
    transition: none;
  }

  /* OFFICE UI DIALOG (requires classname to be passed, ignores styled compoents...) */
  .ms-Dialog-main {
    max-width: ${theme.breakpoints.xs - 30}px !important;
    @media (min-width: ${theme.breakpoints.sm}px) {
      max-width: ${theme.breakpoints.sm - 40}px !important;
    }
  }
`;
