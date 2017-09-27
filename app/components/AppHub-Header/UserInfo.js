import React from 'react';
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

export default UserInfo;
