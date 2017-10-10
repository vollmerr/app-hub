import React from 'react';
import PropTypes from 'prop-types';

import ErrorMessage from './ErrorMessage';
import LoadingMessage from './LoadingMessage';

// https://www.npmjs.com/package/react-loadable
class Loading extends React.PureComponent {
  render() {
    const { text, isLoading, timedOut, pastDelay, error } = this.props;

    if (isLoading) {
      if (timedOut) {
        return <ErrorMessage />;
      } else if (pastDelay) {
        return <LoadingMessage text={text} />;
      }
    } else if (error) {
      return <ErrorMessage />;
    }

    return null;
  }
}

Loading.propTypes = {
  text: PropTypes.string,
  isLoading: PropTypes.bool,
  timedOut: PropTypes.bool,
  pastDelay: PropTypes.bool,
  error: PropTypes.bool,
};

export default Loading;
