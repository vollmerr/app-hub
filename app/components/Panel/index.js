import React from 'react';
import PropTypes from 'prop-types';

import Wrapper from './Wrapper';
import Overlay from './Overlay';
import Content from './Content';


class Panel extends React.PureComponent {
  render() {
    const { onClick, children, left, isOpen } = this.props;

    if (isOpen) {
      return (
        <Wrapper isOpen={isOpen}>
          <Overlay onClick={() => onClick(null)} />
          <Content left={left}>
            {children}
          </Content>
        </Wrapper>
      );
    }

    return null;
  }
}


const { func, bool, node } = PropTypes;

Panel.propTypes = {
  onClick: func.isRequired,
  children: node.isRequired,
  left: bool,
  isOpen: bool.isRequired,
};

export default Panel;
