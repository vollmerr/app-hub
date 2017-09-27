/**
 *
 * SpaHome
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
import makeSelectSpaHome from './selectors';
import reducer from './reducer';
import saga from './saga';

export class SpaHome extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>Spa - Home</title>
          <meta name="description" content="Description of Spa Home" />
        </Helmet>
        in spa home......
      </div>
    );
  }
}

SpaHome.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  spaHome: makeSelectSpaHome(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'spaHome', reducer });
const withSaga = injectSaga({ key: 'spaHome', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SpaHome);
