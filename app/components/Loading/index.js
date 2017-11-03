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
      return <ErrorMessage error={error} />;
    }

    return null;
  }
}


const { bool, string, shape } = PropTypes;

Loading.propTypes = {
  text: string,
  isLoading: bool,
  timedOut: bool,
  pastDelay: bool,
  error: shape({ message: string }),
};

export default Loading;
