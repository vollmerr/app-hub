/**
 *
 * AppHub
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

// import AppHubHeader from 'containers/AppHub-Header';
import AppHubHeader from 'components/AppHub-Header';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectAppHub from './selectors';
import reducer from './reducer';
import saga from './saga';

export class AppHub extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <AppHubHeader />
      </div>
    );
  }
}

AppHub.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  apphub: makeSelectAppHub(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'appHub', reducer });
const withSaga = injectSaga({ key: 'appHub', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AppHub);
