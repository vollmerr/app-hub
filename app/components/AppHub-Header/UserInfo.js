import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Persona,
  PersonaSize,
} from 'office-ui-fabric-react/lib/Persona';

import theme from 'utils/theme';

import Item from './Item';
import Text from './Text';


const User = styled(Persona) `
  margin: 0 15px !important;

  .ms-Persona .ms-Persona-imageArea .ms-Persona-initials {
    background: ${theme.themePrimary};
  }
`;

const UserInfo = ({ text, initals }) => (
  <Item>
    <Text
      text={text}
      size={18}
    />
    <User
      hidePersonaDetails
      size={PersonaSize.small}
      imageInitials={initals}
    />
  </Item>
);

UserInfo.propTypes = {
  text: PropTypes.string.isRequired,
  initals: PropTypes.string.isRequired,
};

export default UserInfo;
