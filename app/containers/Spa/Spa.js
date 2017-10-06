/**
 *
 * Spa
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import App from 'containers/App';

import makeSelectSpa from './selectors';
import reducer from './reducer';
import saga from './saga';
import routes from './routes';
import meta from './meta';

const app = {
  meta,
  routes,
};

export class Spa extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <App app={app} />
    );
  }
}

Spa.propTypes = {
  dispatch: PropTypes.func.isRequired,
  app: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  spa: makeSelectSpa(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'spa', reducer });
const withSaga = injectSaga({ key: 'spa', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Spa);
