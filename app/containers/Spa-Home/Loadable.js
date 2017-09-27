/**
 *
 * Asynchronously loads the component for SpaHome
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
