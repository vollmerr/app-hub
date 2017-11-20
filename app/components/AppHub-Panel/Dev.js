import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { authUser } from 'containers/AppHub/actions';
import { makeSelectUserSam } from 'containers/AppHub/selectors';
import theme from 'utils/theme';

import Wrapper from './Wrapper';


export const Field = styled.div`
  label {
    color: ${theme.white};
  }
`;


/**
 * Panel for development utilities, such as changing user jwt.
 * (This should be in containers, but makes more sense to have with other panels)
 */
export class Dev extends React.PureComponent {
  handleClearToken = () => {
    localStorage.removeItem('id_token');
    window.location.reload();
  }

  handleClickUser = (user) => {
    const { onAuthUser, onClick } = this.props;

    if (user && user.key) {
      localStorage.setItem('id_token', user.key);
    } else {
      localStorage.removeItem('id_token');
    }
    onAuthUser();
    onClick();
    window.location.reload();
  }

  render() {
    const { userSam } = this.props;
    const jwts = DEV.JWT; // eslint-disable-line

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
              value={userSam}
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


const { func, string } = PropTypes;

Dev.propTypes = {
  onAuthUser: func.isRequired,
  userSam: string,
  onClick: func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userSam: makeSelectUserSam(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onAuthUser: () => dispatch(authUser()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dev);
