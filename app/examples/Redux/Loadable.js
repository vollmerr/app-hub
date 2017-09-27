/**
 *
 * Asynchronously loads the component for WithRedux
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
