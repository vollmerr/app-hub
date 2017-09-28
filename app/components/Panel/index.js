/**
*
* Panel
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Overlay } from 'office-ui-fabric-react/lib/Overlay';

import Wrapper from './Wrapper';
import Content from './Content';

function Panel({ onClick, children, isOpen = false }) {
  return (
    <Wrapper isOpen={isOpen}>
      <Overlay onClick={() => onClick(null)} />
      <Content onClick={onClick}>
        {children}
      </Content>
    </Wrapper>
  );
}

Panel.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default Panel;
