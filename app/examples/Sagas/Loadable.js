/**
 *
 * Asynchronously loads the component for Sagas
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
