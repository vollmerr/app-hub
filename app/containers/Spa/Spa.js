import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import AppContainer from 'containers/App-Container';
import { meta } from 'containers/AppHub/meta';

import { initDataRequest } from './actions';
import makeSelectSpa from './selectors';
import reducer from './reducer';
import saga from './saga';
import routes from './routes';

const app = {
  meta: meta.spa,
  routes,
};

export class Spa extends React.PureComponent {
  componentDidMount() {
    const { onInitDataRequest } = this.props;
    onInitDataRequest();
  }

  render() {
    app.name = this.props.name;

    return (
      <AppContainer app={app} />
    );
  }
}

Spa.propTypes = {
  onInitDataRequest: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  spa: makeSelectSpa(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onInitDataRequest: () => dispatch(initDataRequest()),
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
