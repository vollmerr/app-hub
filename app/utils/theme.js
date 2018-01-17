// https://dev.office.com/fabric#/styles/colors
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export default {
  ...DefaultPalette,
  warning: '#fff4ce',
  error: '#fde7e9',
  hub: {
    headerHeight: '50px',
    panelWidth: '360px',
    tileSize: '102px',
    numApps: 6,
  },
  app: {
    navWidth: '225px',
    subNavHeight: '40px',
  },
  list: {
    headerHeight: '60px',
  },
  chart: {
    width: 260,
    height: 260,
    detailsWidth: 200,
    colors: [
      DefaultPalette.themePrimary,
      DefaultPalette.themeDarker,
      DefaultPalette.themeLight,
    ],
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
