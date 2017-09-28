/**
*
* Panel
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import Wrapper from './Wrapper';
import Overlay from './Overlay';
import Content from './Content';

function Panel({ onClick, children, isOpen = false }) {
  return (
    isOpen ?
      <Wrapper isOpen={isOpen}>
        <Overlay onClick={() => onClick(null)} />
        <Content>
          {children}
        </Content>
      </Wrapper>
      : null
  );
}

Panel.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default Panel;
