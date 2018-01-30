import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import toJS from '../../../hocs/toJS';
import theme from '../../../utils/theme';
import * as api from '../../../utils/api';

import * as selectors from '../selectors';
import * as actions from '../actions';

import Wrapper from './Wrapper';


export const Field = styled.div`
  label {
    color: ${theme.white};
  }
`;


/**
 * Panel for development utilities, such as changing user jwt.
 */
export class Dev extends React.PureComponent {
  handleClearToken = () => {
    api.clearToken();
    window.location.reload();
  }

  handleClickUser = (user) => {
    const { onAuthUser, onClick } = this.props;

    if (user && user.key) {
      api.setToken(user.key);
    } else {
      api.clearToken();
    }
    onAuthUser();
    onClick();
    window.location.reload();
  }

  render() {
    const { user } = this.props;
    const jwts = DEV.JWT || MOCK.JWT; // eslint-disable-line

    return (
      jwts ?
        <Wrapper>
          <h2>Developer Options</h2>
          <hr />
          <DefaultButton
            text={'Clear Token'}
            onClick={this.handleClearToken}
          />
          <h3>Switch User</h3>
          <Field>
            <TextField
              disabled
              label={'Current User'}
              value={user.name}
            />
          </Field>
          <Field>
            <TextField
              disabled
              multiline
              rows={user.roles.length + 1}
              label={'Current Roles'}
              value={user.roles.join('\n')}
            />
          </Field>
          {
            Object.keys(jwts).map((group) => (
              <Field key={group}>
                <Dropdown
                  label={`${group} Test Users`}
                  id={group}
                  options={jwts[group]}
                  onChanged={this.handleClickUser}
                />
              </Field>
            ))
          }
        </Wrapper> :
        null
    );
  }
}


const { func, object } = PropTypes;

Dev.propTypes = {
  user: object.isRequired,
  onAuthUser: func.isRequired,
  onClick: func.isRequired,
};


const mapStateToProps = createStructuredSelector({
  user: selectors.getUser,
});

export function mapDispatchToProps(dispatch) {
  return {
    onAuthUser: () => dispatch(actions.authUser()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);


export default compose(
  withConnect,
  toJS,
)(Dev);
