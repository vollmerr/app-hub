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
import messages from './messages';
import { exampleRequest } from './actions';

export class Sagas extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.stats = {};
  }
  // fetch the data async using a saga and redux's dispatch function
  handleFetchData = () => {
    this.props.onExampleRequest();
  }

  render() {
    const { data } = this.props;

    return (
      <Example header={messages.header} desc={messages.desc}>
        <Button onClick={this.handleFetchData}>Click me to Load Data</Button>
        {data && <p>Data: {JSON.stringify(data)}</p>}
      </Example>
    );
  }
}

Sagas.propTypes = {
  onExampleRequest: PropTypes.func.isRequired,
  data: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectSagasData(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onExampleRequest: () => dispatch(exampleRequest()),
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

