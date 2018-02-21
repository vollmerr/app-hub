import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import theme from '../../utils/theme';


export const Content = styled.div`
  padding: ${theme.hub.padding}px;
  padding-top: 0;
`;


export const Line = styled.div`
  height: 1px;
  margin: auto;
  width: 90%;
  background: ${theme.neutralLight};
`;


class HelpSection extends React.PureComponent {
  render() {
    const { title, desc } = this.props;

    return (
      <div>
        <h2>{title}</h2>
        <Content>{desc}</Content>
        <Line />
      </div>
    );
  }
}


const { string, node } = PropTypes;

HelpSection.propTypes = {
  title: string.isRequired,
  desc: node.isRequired,
};


export default HelpSection;
