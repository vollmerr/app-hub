// https://dev.office.com/fabric#/styles/colors
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export default {
  ...DefaultPalette,
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
    width: 400,
    height: 400,
    detailsWidth: 200,
    colors: [DefaultPalette.themePrimary, DefaultPalette.themeDarker],
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
