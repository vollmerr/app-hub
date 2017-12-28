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
// import makeSelectPaas from './selectors';
import reducer from './reducer';
import saga from './saga';
import routes from './routes';

const app = {
  meta: meta.paas,
  routes,
};


export class Paas extends React.PureComponent {
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


const { func, string } = PropTypes;

Paas.propTypes = {
  onInitDataRequest: func.isRequired,
  name: string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  // paas: makeSelectPaas(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onInitDataRequest: () => dispatch(initDataRequest()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'paas', reducer });
const withSaga = injectSaga({ key: 'paas', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Paas);
