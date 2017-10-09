import React from 'react';
import PropTypes from 'prop-types';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import styled from 'styled-components';

import Wrapper from './Wrapper';

const ErrorMessage = styled.div`
  font-size: 24px;
`;

// https://www.npmjs.com/package/react-loadable
class Loading extends React.PureComponent {
  render() {
    const { text, isLoading, timedOut, pastDelay, error } = this.props;

    if (isLoading) {
      if (timedOut) {
        return <div>Timeoput</div>
      } else if (pastDelay) {
        return (
          <Wrapper>
            <Spinner size={SpinnerSize.large} label={text || 'Loading...'} ariaLive={'assertive'} />
          </Wrapper>
        );
      }
    } else if (error) {
      return (
        <Wrapper>
          <div>Sorry, an error has occurred.</div>
        </Wrapper>
      );
    }

    return null;
  }
}

Loading.propTypes = {
  text: PropTypes.string,
};

export default Loading;
