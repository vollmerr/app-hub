import React from 'react';
// import { compose } from 'redux';

// import injectSaga from 'utils/injectSaga';
// import injectReducer from 'utils/injectReducer';
// import App from 'containers/App';
// import Wrapper from 'components/App-Content/Wrapper';
// import Router from '../../components/Router';

// import reducer from './reducer';
// import saga from './saga';

// import withApp from '../../hocs/withApp';
import { meta } from '../AppHub/meta';
import App from '../App';

import routes from './routes';

const appProps = {
  routes,
  meta: meta.spa,
  name: meta.spa.title,
};

export class SPA extends React.PureComponent {
  render() {
    return (
      // <Router routes={routes} />
      <App appProps={appProps} />
    );
  }
}


// const withReducer = injectReducer({ key: 'spa', reducer });
// const withSaga = injectSaga({ key: 'spa', saga });


// export default compose(
//   withReducer,
//   withSaga,
// )(SPA);
export default SPA;
