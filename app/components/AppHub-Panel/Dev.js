/**
*
* Help
*
*/
import React from 'react';
import styled from 'styled-components';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { authUserRequest } from 'containers/AppHub/actions';
import { makeSelectUserSam } from 'containers/AppHub/selectors';
import theme from 'utils/theme';

import Wrapper from './Wrapper';

const Field = styled.div`
  label,
  .ms-Dropdown-caretDown,
  .ms-Dropdown:hover .ms-Dropdown-caretDown {
    color: ${theme.white};
  }

  .ms-TextField-fieldGroup,
  .ms-Dropdown-title {
    border: transparent;
  }

  .ms-Dropdown,
  .ms-Dropdown-title,
  .ms-TextField-field,
  .ms-TextField-field[disabled] {
    background: ${theme.neutralSecondary};
    color: ${theme.white};
  }
`;

/* eslint-disable */
/**
 * Panel for development utilities, such as changing user jwt.
 * (This should be in containers, but makes more sense to have with other panels)
 */
class Dev extends React.PureComponent {
  handleClickUser = (user) => {
    const { dispatch } = this.props;

    if (user && user.key) {
      localStorage.setItem('id_token', user.key);
    } else {
      localStorage.removeItem('id_token');
    }
    dispatch(authUserRequest());
  }

  render() {
    const { userSam } = this.props;

    return (
      DEV_JWT ?
        <Wrapper>
          <h2>Developer Options</h2>
          <hr />
          <h3>Switch User</h3>
          <Field>
            <TextField
              disabled
              label={'Current User'}
              value={userSam}
            />
          </Field>
          {
            Object.keys(DEV_JWT).map(group => (
              <Field key={group}>
                <Dropdown
                  label={`${group} Test Users`}
                  id={group}
                  options={DEV_JWT[group]}
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

Dev.propTypes = {

};


const mapStateToProps = createStructuredSelector({
  userSam: makeSelectUserSam(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dev);
