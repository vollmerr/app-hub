/**
 *
 * Asynchronously loads the component for AppHubHome
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
