import React from 'react';
import PropTypes from 'prop-types';

import ErrorMessage from './ErrorMessage';
import LoadingMessage from './LoadingMessage';


// https://www.npmjs.com/package/react-loadable
class Loading extends React.PureComponent {
  render() {
    const { text, loading, isLoading, timedOut, pastDelay, error } = this.props;

    if (loading) {
      return <LoadingMessage text={text} />;
    } else if (isLoading) { // isLoading and timeOut, etc is used by react-loadable
      if (timedOut) {
        return <ErrorMessage {...this.props} />;
      } else if (pastDelay) {
        return <LoadingMessage text={text} />;
      }
    } else if (error) {
      return <ErrorMessage {...this.props} />;
    }

    return null;
  }
}


const { bool, string, shape, number, oneOfType } = PropTypes;

Loading.propTypes = {
  text: string,
  loading: oneOfType([bool, number]),
  isLoading: bool,
  timedOut: bool,
  pastDelay: bool,
  error: shape({ message: string }),
};

export default Loading;
