import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CommandButton } from 'office-ui-fabric-react/lib/Button';

import StyledLink from 'components/Link';
import theme from 'utils/theme';
// import HeaderItem from 'components/Header/HeaderItem';
import Item from './Item';

const ButtonStyled = styled(CommandButton) `
  color: ${theme.white};
  display: flex;
  justify-content: center;
  vertical-align: middle;
  border-width: 0;
  padding: 0 ${(props) => props.padding || '0'};
  min-width: ${theme.hub.headerHeight};
  height: ${theme.hub.headerHeight};
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

class Link extends React.PureComponent {
  render() {
    const {
      panel,
      title,
      iconProps,
      onClick,
      to,
      href,
      text,
      children,
      dark,
      checked,
      padding,
    } = this.props;

    const isLink = onClick || to || href;

    const Button = () => (
      <ButtonStyled
        onClick={onClick ? () => onClick(panel) : null}
        iconProps={iconProps}
        title={title}
        dark={dark}
        ariaLabel={title}
        checked={checked}
        padding={padding}
      >
        {text}
        {children}
      </ButtonStyled>
    );

    const itemProps = {
      isLink,
      dark,
      checked,
    };

    // handle routing
    if (to || href) {
      return (
        <Item {...itemProps}>
          <StyledLink to={to} href={href} >
            <Button />
          </StyledLink>
        </Item>
      );
    }

    // no links
    return (
      <Item {...itemProps}>
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
  dark: PropTypes.bool,
};

export default Link;
