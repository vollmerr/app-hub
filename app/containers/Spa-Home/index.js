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
import { makeSelectUser } from 'containers/AppHub/selectors';

import makeSelectSpaHome, { makeSelectExampleData } from './selectors';
import { exampleDataRequest } from './actions';
import reducer from './reducer';
import saga from './saga';

export class SpaHome extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { user, exampleData, dispatch } = this.props;
    const testScroll = false;
    return (
      <div>
        <Helmet>
          <title>Spa - Home</title>
          <meta name="description" content="Description of Spa Home" />
        </Helmet>
        <p>in spa home......</p>
        <p>Logged in as {user.sam}</p>
        <p>with permissions (BARS):</p>
        <ul>
          {
            user.roles.map((role) => <li key={role}>{role}</li>)
          }
        </ul>
        <button style={{ background: '#333', color: '#fff' }} onClick={() => dispatch(exampleDataRequest())}>Test data fetch</button>
        {
          exampleData &&
          <p>{JSON.stringify(exampleData)}</p>
        }
        {
          testScroll &&
          <div><h1>TEST SCROLL</h1><h1>TEST SCROLL</h1><h1>TEST SCROLL</h1><h1>TEST SCROLL</h1><h1>TEST SCROLL</h1><h1>TEST SCROLL</h1><h1>TEST SCROLL</h1><h1>TEST SCROLL</h1><h1>TEST SCROLL</h1><h1>TEST SCROLL</h1><h1>TEST SCROLL</h1><h1>TEST SCROLL</h1><h1>TEST SCROLL</h1><h1>TEST SCROLL</h1><h1>TEST SCROLL</h1><h1>TEST SCROLL</h1><h1>TEST SCROLL</h1><h1>TEST SCROLL</h1><h1>TEST SCROLL</h1><h1>TEST SCROLL</h1><h1>TEST SCROLL</h1><h1>TEST SCROLL</h1><h1>TEST SCROLL</h1></div>
        }
      </div>
    );
  }
}

SpaHome.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  spaHome: makeSelectSpaHome(),
  exampleData: makeSelectExampleData(),
  user: makeSelectUser(),
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
