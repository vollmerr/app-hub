import React from 'react';

import Loading from './';

class TestPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Test Loading...',
      isLoading: true,
      timedOut: false,
      pastDelay: true,
      error: false,
    };
  }

  render() {
    return <Loading {...this.state} />;
  }
}

export default TestPage;
