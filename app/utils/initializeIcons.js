import { registerIcons } from '@uifabric/styling/lib/index';

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
      src: `url('') format('woff')`,
    },
    icons: {
      GlobalNavButton: '\uE700',
      question: '\uE006',
      bell: '\uE010',
      menu: '\uE020',
      gear: '\uE035',
      waffle2: '\uE704',
    },
  });
};
// https://static2.sharepointonline.com/files/fabric/assets/icons/fabricmdl2icons-2.38.woff
export default initializeIcons;
