import * as C from '../constants';

import AppNav from '../../App/Nav';

import Help from './Help';
import AppTiles from './AppTiles';
import Alerts from './Alerts';
import Dev from './Dev';
// import Mock from './Mock';


export default {
  [C.HELP_PANEL]: {
    component: Help,
  },
  [C.APPS_PANEL]: {
    component: AppTiles,
  },
  [C.APP_NAV_PANEL]: {
    isLeft: true,
    component: AppNav,
  },
  [C.ALERTS_PANEL]: {
    component: Alerts,
  },
  [C.DEV_PANEL]: {
    component: Dev,
  },
  // [C.MOCK_PANEL]: {
  //   component: Mock,
  // },
};
