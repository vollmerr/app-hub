// https://dev.office.com/fabric#/styles/colors
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export default {
  ...DefaultPalette,
  hub: {
    headerHeight: '50px',
    panelWidth: '360px',
    tileSize: '102px',
  },
  app: {
    navWidth: '225px',
  },
  list: {
    headerHeight: '60px',
  },
  zIndex: { // https://v4-alpha.getbootstrap.com/layout/overview/#z-index
    overlay: 1040,
    panel: 1050,
  },
  breakpoints: {
    xs: 430,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
  },
};
