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

const Wrapper = styled.div`
  padding: 15px;
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
          <h1>Development Options</h1>
          <hr />
          <h2>Switch User</h2>
          <TextField
            disabled
            label={'Current User'}
            value={userSam}
          />
          {
            Object.keys(DEV_JWT).map(group => (
              <Dropdown
                key={group}
                label={`${group} Test Users`}
                id={group}
                options={DEV_JWT[group]}
                onChanged={this.handleClickUser}
              />
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
