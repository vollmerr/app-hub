import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import App from 'containers/App';
import { meta } from 'containers/AppHub/meta';

import makeSelectDemo from './selectors';
import reducer from './reducer';
import saga from './saga';
import routes from './routes';

const app = {
  meta: meta.demo,
  routes,
};

export class Demo extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <App app={app} />
    );
  }
}

Demo.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  demo: makeSelectDemo(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'demo', reducer });
const withSaga = injectSaga({ key: 'demo', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Demo);
