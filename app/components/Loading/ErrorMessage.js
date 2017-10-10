import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

import Link from 'components/Link';

import Wrapper from './Wrapper';

const Header = styled.div`
  font-size: 24px;
`;

const Message = styled.div`
  font-size: 14px;
`;

const Button = styled(DefaultButton) `
  margin: 20px;
`;

class ErrorMessage extends React.PureComponent {
  render() {
    const { error } = this.props;
    const message = error && error.message;

    return (
      <Wrapper>
        <Header>Sorry, an error has occurred.</Header>
        {message && <Message>{message}</Message>}
        <Link to={'/'}><Button primary>Home</Button></Link>
      </Wrapper>
    );
  }
}

ErrorMessage.propTypes = {
  error: PropTypes.object,
};

export default ErrorMessage;
