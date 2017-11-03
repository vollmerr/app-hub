import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';


export const StyledLink = styled(RouterLink) `
  text-decoration: none;
`;


export const A = styled.a`
  text-decoration: none;
`;


class Link extends React.PureComponent {
  render() {
    const { to, href, children, ...props } = this.props;

    if (to) {
      return (
        <StyledLink to={to} {...props}>
          {children}
        </StyledLink>
      );
    }

    return (
      <A href={href} target={'_blank'} rel={'noopener noreferrer'} {...props}>
        {children}
      </A>
    );
  }
}


const { string, node } = PropTypes;

Link.propTypes = {
  to: string,
  href: string,
  children: node,
};

export default Link;
