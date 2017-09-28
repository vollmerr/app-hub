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

class Panel extends React.PureComponent {
  render() {
    const { onClick, children, isOpen = false } = this.props;

    if (isOpen) {
      return (
        <Wrapper isOpen={isOpen}>
          <Overlay onClick={() => onClick(null)} />
          <Content>
            {children}
          </Content>
        </Wrapper>
      );
    }

    return null;
  }
}

Panel.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default Panel;
