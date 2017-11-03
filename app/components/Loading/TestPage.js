import React from 'react';

import Loading from './';


class TestPage extends React.PureComponent {
  render() {
    const props = {
      text: 'Test Loading...',
      isLoading: true,
      timedOut: false,
      pastDelay: true,
      error: null,
      // error: { message: 'error message...' },
    };

    return <Loading {...props} />;
  }
}

export default TestPage;
