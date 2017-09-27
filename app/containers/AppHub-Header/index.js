/**
 *
 * AppHubHeader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link } from 'react-router-dom';

import { routes } from 'containers/AppHub/Router';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectAppHubHeader from './selectors';
import reducer from './reducer';
import saga from './saga';

export class AppHubHeader extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        {
          Object.values(routes).map((route) => (
            <Link key={route.to} to={route.to}>{route.text}</Link>
          ))
        }
      </div>
    );
  }
}

AppHubHeader.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  apphubHeader: makeSelectAppHubHeader(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'appHubHeader', reducer });
const withSaga = injectSaga({ key: 'appHubHeader', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AppHubHeader);
