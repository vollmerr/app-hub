import { registerIcons } from '@uifabric/styling/lib/index';
import appHubIcons from 'images/office365icons.woff';

const initializeIcons = (baseUrl = 'images/') => {
  registerIcons({
    style: {
      MozOsxFontSmoothing: 'grayscale',
      WebkitFontSmoothing: 'antialiased',
      fontStyle: 'normal',
      fontWeight: 'normal',
      speak: 'none',
    },
    fontFace: {
      // fontFamily: `"FabricMDL2Icons"`, // eslint-disable-line
      // src: `url('images/fabricmdl2icons-2.38.woff') format('woff')`,
      fontFamily: `"appHubIcons"`,
      src: `url(${appHubIcons}) format('woff')`,
    },
    icons: {
      // NAV
      helpMenu: '\uE006',
      alertsMenu: '\uE010',
      appMenu: '\uE020',
      settingsMenu: '\uE035',
      appHubMenu: '\uE303',
      // APPS
      ED: '\uE417',
      Loading: '\uE20B',
      SPA: '\uE22E',
      Apphub: '\uE300',
      COLD: '\uE408',
      BARS: '\uE259',
      // requried by office-ui
      chevrondown: '\uE087',
      chevronup: '\uE088',
      Search: '\uE039',
      clear: '\uE353',
    },
  });
};
// https://static2.sharepointonline.com/files/fabric/assets/icons/fabricmdl2icons-2.38.woff
export default initializeIcons;
