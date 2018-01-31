import React from 'react';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { meta } from '../AppHub/meta';
import App from '../App';

import routes from './routes';
import reducer from './reducer';
import saga from './saga';


const appProps = {
  routes,
  meta: meta.spa,
  name: meta.spa.title,
};


export class SPA extends React.PureComponent {
  render() {
    return (
      <App appProps={appProps} />
    );
  }
}


const withReducer = injectReducer({ key: 'spa', reducer });
const withSaga = injectSaga({ key: 'spa', saga });


export default compose(
  withReducer,
  withSaga,
)(SPA);
