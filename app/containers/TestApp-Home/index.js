import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import ErrorMessage from 'components/Loading/ErrorMessage';
import Content from 'components/App-Content/Content';
import actions from 'containers/TestApp/actions';

export class TestAppHome extends React.PureComponent {
  componentDidMount() {
    const { onClearErrors } = this.props;
    onClearErrors();
  }

  render() {
    const { error } = this.props;

    if (error) {
      return <ErrorMessage error={error} to={'/test-app'} />;
    }

    return (
      <Content>
        CONTENT PLACEHOLDER
      </Content>
    );
  }
}

TestAppHome.propTypes = {
  onClearErrors: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
};


export function mapDispatchToProps(dispatch) {
  return {
    onClearErrors: () => dispatch(actions.clearErrors()),
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(
  withConnect,
)(TestAppHome);
