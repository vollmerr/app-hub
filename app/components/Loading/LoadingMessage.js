import React from 'react';
import PropTypes from 'prop-types';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';

import Wrapper from './Wrapper';


class LoadingMessage extends React.PureComponent {
  render() {
    const { text } = this.props;

    return (
      <Wrapper>
        <Spinner size={SpinnerSize.large} label={text || 'Loading...'} ariaLive={'assertive'} />
      </Wrapper>
    );
  }
}


const { string } = PropTypes;

LoadingMessage.propTypes = {
  text: string,
};

export default LoadingMessage;
