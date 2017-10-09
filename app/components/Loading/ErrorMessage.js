import React from 'react';
import styled from 'styled-components';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

import Link from 'components/Link';

import Wrapper from './Wrapper';

const Message = styled.div`
  font-size: 24px;
`;

const Button = styled(DefaultButton)`
  margin: 15px;
`;

class ErrorMessage extends React.PureComponent {
  render() {
    return (
      <Wrapper>
        <Message>Sorry, an error has occurred.</Message>
        <Link to={'/'}><Button primary>Home</Button></Link>
      </Wrapper>
    );
  }
}

export default ErrorMessage;
