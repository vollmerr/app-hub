import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

import Link from 'components/Link';

import Wrapper from './Wrapper';

export const Header = styled.div`
  font-size: 24px;
`;

export const Message = styled.div`
  font-size: 14px;
`;

const Button = styled(DefaultButton) `
  margin: 20px;
`;

class ErrorMessage extends React.PureComponent {
  render() {
    const { error, to } = this.props;

    let message;
    if (error) {
      if (typeof error === 'string') {
        message = error;
      } else {
        message = error.message;
      }
    }

    return (
      <Wrapper>
        <Header>Sorry, an error has occurred.</Header>
        {message && <Message>{message}</Message>}
        <Link to={to || '/'}><Button primary>Home</Button></Link>
      </Wrapper>
    );
  }
}

ErrorMessage.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
  to: PropTypes.string,
};

export default ErrorMessage;
