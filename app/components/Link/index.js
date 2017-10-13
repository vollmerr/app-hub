/**
*
* Link
*
*/

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

Link.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string,
  children: PropTypes.node,
};

export default Link;
