import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import AppContainer from 'containers/App-Container';
import { meta } from 'containers/AppHub/meta';

import reducer from './reducer';
import saga from './saga';
import routes from './routes';

const app = {
  meta: meta.paas,
  routes,
};


export class Paas extends React.PureComponent {
  render() {
    app.name = this.props.name;

    return (
      <AppContainer app={app} />
    );
  }
}


const { string } = PropTypes;

Paas.propTypes = {
  name: string.isRequired,
};

const withReducer = injectReducer({ key: 'paas', reducer });
const withSaga = injectSaga({ key: 'paas', saga });

export default compose(
  withReducer,
  withSaga,
)(Paas);
