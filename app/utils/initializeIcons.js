import { registerIcons } from '@uifabric/styling/lib/index';
import appHubIcons from 'images/office365icons.woff';

// http://o365icons.cloudapp.net/
const initializeIcons = () => {
  registerIcons({
    style: {
      MozOsxFontSmoothing: 'grayscale',
      WebkitFontSmoothing: 'antialiased',
      fontStyle: 'normal',
      fontWeight: 'normal',
      speak: 'none',
    },
    fontFace: {
      fontFamily: `"appHubIcons"`, // eslint-disable-line
      src: `url(${appHubIcons}) format('woff')`,
    },
    icons: {
      // NAV
      helpMenu: '\uE006',
      alertsMenu: '\uE010',
      appMenu: '\uE020',
      settingsMenu: '\uE035',
      appHubMenu: '\uE303',
      // __APPS__
      ED: '\uE417',
      Loading: '\uF8FD',
      Demo: '\uF8FD',
      // SPA: '\uE22E',
      Apphub: '\uE300',
      COLD: '\uE408',
      BARS: '\uE259',
      // requried by office-ui
      chevrondown: '\uE088',
      chevronup: '\uE087',
      Search: '\uE039',
      Clear: '\uE353',
      CircleRing: '\uF8FE',
      StatusCircleCheckmark: '\uF8FF',
      sortup: '\uF8FB',
      sortdown: '\uF8FC',
      calendar: '\uE38E',
      up: '\uE27A',
      down: '\uE27B',
      checkmark: '\uF8FA',
    },
  });
};

export default initializeIcons;
