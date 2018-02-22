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
      Pas: '\uF8F3',
      Spa: '\uE0A2',
      ED: '\uE417',
      Loading: '\uF8FD',
      Demo: '\uF8FD',
      Apphub: '\uE300',
      COLD: '\uE408',
      BARS: '\uE259',
      // misc
      email: '\uF8F5',
      download: '\uF8F6',
      Attach: '\uF8F7',
      deny: '\uF8F2',
      approve: '\uF8F3',
      // requried by office-ui
      more: '\uF8F4',
      chevrondown: '\uE088',
      chevronup: '\uE087',
      Search: '\uE039',
      Cancel: '\uF8F8',
      Clear: '\uE353',
      CircleRing: '\uF8FE',
      StatusCircleCheckmark: '\uF8FF',
      sortup: '\uF8FB',
      sortdown: '\uF8FC',
      calendar: '\uE38E',
      up: '\uE27A',
      down: '\uE27B',
      checkmark: '\uF8FA',
      plus: '\uE278',
      navBack: '\uF8F9',
    },
  });
};

export default initializeIcons;
