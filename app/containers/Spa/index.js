import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import { shouldFetch } from '../../utils/api';
import toJS from '../../hocs/toJS';

import { meta } from '../AppHub/meta';
import App from '../App';

import routes from './routes';
import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';


const appProps = {
  routes,
  meta: meta.spa,
  name: meta.spa.title,
};


export class SPA extends React.PureComponent {
  componentDidMount() {
    const { ackStatus, onGetAckStatusRequest } = this.props;
    if (shouldFetch(ackStatus.lastFetched)) {
      onGetAckStatusRequest();
    }
  }

  render() {
    return (
      <App {...appProps} />
    );
  }
}


const { object, func } = PropTypes;

SPA.propTypes = {
  ackStatus: object.isRequired,
  onGetAckStatusRequest: func.isRequired,
};


const mapStateToProps = createStructuredSelector({
  ackStatus: selectors.getAckStatus,
});

export const mapDispatchToProps = (dispatch) => ({
  onGetAckStatusRequest: () => dispatch(actions.getAckStatusRequest()),
});

const withReducer = injectReducer({ key: 'spa', reducer });
const withSaga = injectSaga({ key: 'spa', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);


export default compose(
  withReducer,
  withSaga,
  withConnect,
  toJS,
)(SPA);
