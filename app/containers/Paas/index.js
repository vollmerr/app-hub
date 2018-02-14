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
  meta: meta.paas,
  name: meta.paas.title,
};


export class Paas extends React.PureComponent {
  render() {
    const props = {
      appProps,
    };

    return (
      <App {...props} />
    );
  }
}


const withReducer = injectReducer({ key: 'paas', reducer });
const withSaga = injectSaga({ key: 'paas', saga });


export default compose(
  withReducer,
  withSaga,
)(Paas);
