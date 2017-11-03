import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { List } from 'office-ui-fabric-react/lib/List';

import Link from 'components/Link';
import theme from 'utils/theme';


export const Wrapper = styled.div`
  background: ${theme.neutralLighter};
  padding: 25px;
  height: ${(props) => props.isMobile ? '100%' : '80%'};
  width: 100%;
  max-width: 800px;
  ${(props) => !props.isMobile &&
    `box-shadow: 0 0 15px ${theme.neutralTertiaryAlt};`
  }
`;


export const Padded = styled.div`
  padding: 0 0 15px 15px;
`;


export const Header = Padded.withComponent('h2');


export const updates = [
  {
    name: 'The Badge Access Request System (BARS) is now live!',
    date: '2017/10/08',
    href: 'http://bars.technology.ca.gov/',
    desc: <Padded>
      <p>This system allows users to easily apply for ODI access badges. It relaces the old paper form for an entirely online experience, and provides features including email reminders and alerts, automatic workflow, and record history.</p>
      <p>Get started today at <Link href={'http://bars.technology.ca.gov/'}>http://bars.technology.ca.gov</Link>.</p>
    </Padded>,
  },
  {
    name: 'Initial release of the ODI App Hub',
    date: '2017/10/08',
    to: '/',
    desc: <Padded>
      <p>We are proud to announce the release of the ODI App hub; a central location for ODI internal applications.</p>
      <p>It is built using the latest technologies such as React, Webpack, Node, and .Net Core 2</p>
    </Padded>,
  },
];


export const Item = styled.div`
  display: flex;
  align-items: center;
  padding: 0 15px;
  min-height: 50px;

  &:hover,
  &:focus,
  &:active {
    background: ${theme.neutralLight};
  }
`;


export const Date = styled.div`
  flex: 1;
`;


export const Name = styled(Link) `
  flex: 4;
  padding: 0 15px;
  color: ${theme.neutralDark};

  &:hover {
    color: ${theme.themeDark};
  }
`;


export const ReadMore = styled.div`
  flex: 1;
  text-align: center;
  cursor: pointer;
  color: ${theme.themeDark};
  padding: 15px;

  &:hover {
    color: ${theme.themePrimary};
  }
`;


class Updates extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isReadingMore: false,
      name: '',
      desc: '',
    };
  }

  handleClickRead = (item = {}) => () => {
    this.setState({
      name: item.name,
      desc: item.desc,
      isReadingMore: item.name,
    });
  }

  renderCell = (item) => (
    <Item>
      <Date>{item.date}</Date>
      <Name to={item.to} href={item.href}>{item.name}</Name>
      <ReadMore onClick={this.handleClickRead(item)}>Read More</ReadMore>
    </Item>
  )

  render() {
    const { isMobile } = this.props;
    const { isReadingMore, name, desc } = this.state;

    return (
      <Wrapper isMobile={isMobile}>
        <Header>
          {
            isReadingMore ?
              name :
              'Updates'
          }
        </Header>
        {
          isReadingMore ?
            <div>{desc}<ReadMore onClick={this.handleClickRead()}>Back</ReadMore></div> :
            <List
              items={updates}
              onRenderCell={this.renderCell}
            />
        }
      </Wrapper>
    );
  }
}


const { bool } = PropTypes;

Updates.propTypes = {
  isMobile: bool.isRequired,
};

export default Updates;

