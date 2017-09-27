/**
 *
 * AppHubHome
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectAppHubHome from './selectors';
import reducer from './reducer';
import saga from './saga';

export class AppHubHome extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>AppHubHome</title>
          <meta name="description" content="Description of AppHubHome" />
        </Helmet>
        in the app hub home...
      </div>
    );
  }
}

AppHubHome.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  apphubhome: makeSelectAppHubHome(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'appHubHome', reducer });
const withSaga = injectSaga({ key: 'appHubHome', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AppHubHome);
