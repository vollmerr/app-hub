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
import { routes } from './Router';

const app = {
  routes,
  meta: {
    name: 'SPA',
    title: 'SPA',
    desc: 'SPA DESC',
  },
};

export class Spa extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    console.log('in app')
    return (
      <App app={app}>
        {this.props.children}
      </App>
    );
  }
}

Spa.propTypes = {
  dispatch: PropTypes.func.isRequired,
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
