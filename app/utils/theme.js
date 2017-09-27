// https://dev.office.com/fabric#/styles/colors
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export default {
  ...DefaultPalette,
  hub: {
    headerHeight: '60px',
  },
  app: {
    headerHeight: '50px',
    navWidth: '240px',
  },
  breakpoints: {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
  },
};
