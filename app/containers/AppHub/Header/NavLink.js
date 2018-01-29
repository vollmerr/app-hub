import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CommandButton } from 'office-ui-fabric-react/lib/Button';

import Link from 'components/Link';
import theme from 'utils/theme';

import NavItem from './NavItem';


export const ButtonStyled = styled(CommandButton) `
  color: ${theme.white};
  display: flex;
  justify-content: center;
  vertical-align: middle;
  border-width: 0;
  padding: 0 ${(props) => props.padding || '0'};
  min-width: ${theme.hub.headerHeight}px;
  height: ${theme.hub.headerHeight}px;
  box-sizing: border-box;
  text-align: center;
  line-height: normal;
  overflow: visible;
  transition: background-color .467s cubic-bezier(.1,.9,.2,1) 34ms;
  pointer-events: all;
  font-size: ${(props) => props.size || '24px'};
  &:hover,
  i.ms-Icon,
  &:hover i.ms-Icon,
  &.is-checked i.ms-Icon {
    color: ${theme.white};
  }
`;


export function Button({ text, children, onClick, panel, ...props }) { //eslint-disable-line
  const newOnClick = onClick ? () => onClick(panel) : null;

  return (
    <ButtonStyled
      onClick={newOnClick}
      {...props}
    >
      {text}
      {children}
    </ButtonStyled>
  );
}


class NavLink extends React.PureComponent {
  render() {
    const {
      iconProps,
      onClick,
      to,
      href,
      dark,
      title,
      checked,
      ...props
    } = this.props;

    const isLink = !!(onClick || to || href);
    const newIconProps = iconProps && { style: { fontSize: '20px' }, ...iconProps };

    const itemProps = {
      isLink,
      dark,
      checked,
    };

    const buttonProps = {
      dark,
      title,
      checked,
      onClick,
      ariaLabel: title,
      iconProps: newIconProps,
      ...props,
    };

    // handle routing
    if (to || href) {
      return (
        <NavItem {...itemProps}>
          <Link to={to} href={href} >
            <Button {...buttonProps} />
          </Link>
        </NavItem>
      );
    }

    // no links
    return (
      <NavItem {...itemProps}>
        <Button {...buttonProps} />
      </NavItem>
    );
  }
}


const { func, bool, string, node, shape } = PropTypes;

NavLink.propTypes = {
  panel: string,
  title: string,
  iconProps: shape({
    iconName: string,
  }),
  onClick: func,
  text: string,
  to: string,
  href: string,
  children: node,
  dark: bool,
  checked: bool,
  padding: string,
};


export default NavLink;
