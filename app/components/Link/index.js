/**
*
* Link
*
*/

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(RouterLink) `
  text-decoration: none;
`;

const A = styled.a`
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
      <A href={href} target={'_blank'} {...props}>
        {children}
      </A>
    );
  }
}

Link.propTypes = {

};

export default Link;
