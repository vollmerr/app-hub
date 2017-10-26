import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import AppContainer from 'containers/App-Container';
import { meta } from 'containers/AppHub/meta';

import actions from './actions';
import makeSelectTestApp from './selectors';
import reducer from './reducer';
import saga from './saga';
import routes from './routes';

const app = {
  meta: meta.testApp,
  routes,
};

export class TestApp extends React.PureComponent {
  componentDidMount() {
    const { onInitDataRequest } = this.props;
    onInitDataRequest();
  }

  render() {
    return (
      <AppContainer app={app} />
    );
  }
}

TestApp.propTypes = {
  onInitDataRequest: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  testApp: makeSelectTestApp(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onInitDataRequest: () => dispatch(actions.initDataRequest()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'testApp', reducer });
const withSaga = injectSaga({ key: 'testApp', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TestApp);
