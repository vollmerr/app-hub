/**
 *
 * Asynchronously loads the component for ComponentToLoad
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,  // This would be a loading component
});
