/**
 *
 * Asynchronously loads the component for AppPanel
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
