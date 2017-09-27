/**
 *
 * Sagas
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Example from 'examples/common/Example';
import Button from 'examples/common/Button';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSagasData from './selectors';
import reducer from './reducer';
import saga from './saga';
import { EXAMPLE_DATA_REQUEST } from './constants';
import messages from './messages';

export class Sagas extends React.Component { // eslint-disable-line react/prefer-stateless-function
  handleFetchData = () => {
    // 'dispatch' is now the same thing as
    // using 'this.props.dispatch' after this
    const { dispatch } = this.props;
    // this action would typically go into a 'actions.js' folder
    const action = { type: EXAMPLE_DATA_REQUEST };
    // fetch the data async using a saga and redux's dispatch function
    dispatch(action);
  }

  render() {
    return (
      <Example header={messages.header} desc={messages.desc}>
        <Button onClick={this.handleFetchData}>Click me to Load Data</Button>
        <p>Data: {JSON.stringify(this.props.data)}</p>
      </Example>
    );
  }
}

Sagas.propTypes = {
  dispatch: PropTypes.func.isRequired,
  data: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectSagasData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'sagas', reducer });
const withSaga = injectSaga({ key: 'sagas', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Sagas);

