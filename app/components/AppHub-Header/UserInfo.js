import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import theme from 'utils/theme';

import Item from './Item';

export const Name = styled.span`
  color: ${theme.themeLighterAlt};
  line-height: ${theme.hub.headerHeight}px;
  display: inline-block;
  font-family: "SegoeUI-SemiLight-final","Segoe UI SemiLight","Segoe UI WPC Semilight","Segoe UI",Segoe,Tahoma,Helvetica,Arial,sans-serif;
  font-size: 18px;
  -webkit-font-smoothing: antialiased;
`;

export const Initials = styled.div`
  width: calc(${theme.hub.headerHeight}px - 10px);
  height: calc(${theme.hub.headerHeight}px - 10px);
  color: ${theme.themeLighterAlt};
  background: ${theme.themePrimary};
  border-radius: 50%;
  margin: 0 15px 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;


const UserInfo = ({ name, initials }) => (
  <Item>
    <Name>{name}</Name>
    <Initials>{initials}</Initials>
  </Item>
);


const { string } = PropTypes;

UserInfo.propTypes = {
  name: string.isRequired,
  initials: string.isRequired,
};

export default UserInfo;
