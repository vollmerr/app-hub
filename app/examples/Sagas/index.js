import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Example from 'examples/common/Example';
import Button from 'examples/common/Button';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import makeSelectSagasData, {
  makeSelectSagasLoading,
  makeSelectSagasError,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { exampleRequest, clearErrors } from './actions';

export class Sagas extends React.PureComponent {
  constructor(props) {
    super(props);
    this.stats = {};
  }

  componentDidMount() {
    const { onClearErrors } = this.props;
    onClearErrors();
  }

  // fetch the data async using a saga and redux's dispatch function
  handleFetchData = () => {
    const { onExampleRequest } = this.props;
    onExampleRequest();
  }

  render() {
    const { data, loading, error } = this.props;

    return (
      <Example header={messages.header} desc={messages.desc}>
        <Button onClick={this.handleFetchData}>Click me to Load Data</Button>
        {
          (loading && <p>Loading...</p>) ||
          (error && <p>An error has occurred.</p>) ||
          (data && <p>Data: {JSON.stringify(data)}</p>)
        }
      </Example>
    );
  }
}

Sagas.propTypes = {
  onExampleRequest: PropTypes.func.isRequired,
  onClearErrors: PropTypes.func.isRequired,
  data: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectSagasData(),
  loading: makeSelectSagasLoading(),
  error: makeSelectSagasError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onExampleRequest: () => dispatch(exampleRequest()),
    onClearErrors: () => dispatch(clearErrors()),
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

