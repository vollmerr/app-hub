import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

import * as actions from '../../containers/AppHub/actions';
import { clearToken } from '../../utils/api';

import Link from '../Link';

import Wrapper from './Wrapper';


export const Header = styled.div`
  font-size: 24px;
`;


export const Message = styled.div`
  font-size: 14px;
`;


export const Button = styled(DefaultButton) `
  margin: 20px;
`;


export class ErrorMessage extends React.PureComponent {
  handleClick = () => {
    const { onAuthUser, onChangeAppStatus } = this.props;

    clearToken();
    onAuthUser();
    onChangeAppStatus();
  }

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
        <Link to={to || '/'} onClick={this.handleClick}><Button primary>Home</Button></Link>
      </Wrapper>
    );
  }
}


const { func, string, shape, oneOfType } = PropTypes;

ErrorMessage.propTypes = {
  error: oneOfType([
    shape({ message: string }),
    string,
  ]),
  to: string,
  onAuthUser: func.isRequired,
  onChangeAppStatus: func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    onAuthUser: () => dispatch(actions.authUser()),
    onChangeAppStatus: () => dispatch(actions.changeAppStatus({ loading: 0, error: null })),
  };
}


export default connect(null, mapDispatchToProps)(ErrorMessage);
