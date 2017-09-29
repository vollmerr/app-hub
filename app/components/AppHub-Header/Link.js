import React from 'react';
import styled from 'styled-components';
import { CommandButton, ElementType } from 'office-ui-fabric-react/lib/Button';
import { Link as RouterLink } from 'react-router-dom';

import theme from 'utils/theme';
import PropTypes from 'prop-types';
// import HeaderItem from 'components/Header/HeaderItem';
import Item from './Item';

const LinkStyled = styled(RouterLink) `
  text-decoration: none;
`;

const A = LinkStyled.withComponent('a');

const ButtonStyled = styled(CommandButton) `
  color: ${theme.themePrimary};
  display: block;
  vertical-align: middle;
  border-width: 0;
  margin: 0;
  padding: 0 15px;
  min-width: ${theme.hub.headerHeight};
  height: ${theme.hub.headerHeight};
  box-sizing: border-box;
  text-align: center;
  line-height: normal;
  overflow: visible;
  transition: background-color .467s cubic-bezier(.1,.9,.2,1) 34ms;
  pointer-events: all;
  font-size: ${(props) => props.size || '28px'};
`;

class Link extends React.PureComponent {
  render() {
    const { panel, title, iconProps, onClick, to, href, text, children } = this.props;

    const isLink = onClick || to || href;

    const Button = () => (
      <ButtonStyled
        onClick={onClick ? () => onClick(panel) : null}
        iconProps={iconProps}
        title={title}
        ariaLabel={title}
      >
        {text}
        {children}
      </ButtonStyled>
    );

    // handle internal routing
    if (to) {
      return (
        <Item isLink={isLink}>
          <LinkStyled to={to} >
            <Button />
          </LinkStyled>
        </Item>
      );
    } else if (href) {
      return (
        <Item isLink={isLink}>
          <A href={href} >
            <Button />
          </A>
        </Item>
      );
    }

    // no links
    return (
      <Item isLink={isLink}>
        <Button />
      </Item>
    );
  }
}

Link.propTypes = {
  panel: PropTypes.string,
  title: PropTypes.string,
  iconProps: PropTypes.object,
  onClick: PropTypes.func,
  text: PropTypes.string,
  to: PropTypes.string,
  href: PropTypes.string,
  children: PropTypes.node,
};

export default Link;
