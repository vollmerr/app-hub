import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { List } from 'office-ui-fabric-react/lib/List';

import Link from 'components/Link';
import theme from 'utils/theme';

const Wrapper = styled.div`
  background: ${theme.neutralLighter};
  padding: 25px;
  height: ${(props) => props.isMobile ? '100%' : '80%'};
  width: 100%;
  max-width: 800px;
  ${(props) => !props.isMobile &&
    `box-shadow: 0 0 15px ${theme.neutralTertiaryAlt};`
  }
  > h2 {
    padding: 15px;
  }
`;

const updates = [
  {
    name: 'The Badge Access Request System (BARS) is now live!',
    date: '2017/10/08',
    href: 'http://bars.technology.ca.gov/',
    desc: <div>
      <p>This system allows users to easily apply for ODI access badges. It relaces the old paper form for an entirely online experience, and provides features including email reminders and alerts, automatic workflow, and record history.</p>
      <p>Get started today at <Link href={'http://bars.technology.ca.gov/'}>http://bars.technology.ca.gov</Link>.</p>
    </div>,
  },
  {
    name: 'Initial release of the ODI App Hub',
    date: '2017/10/08',
    to: '/',
    desc: <div>
      <p>We are proud to announce the release of the ODI App hub; a central location for ODI internal applications.</p>
      <p>It is built using the latest technologies such as React, Webpack, Node, and .Net Core 2</p>
    </div>,
  },
];

const Item = styled.div`
  display: flex;
  padding: 15px;
  min-height: 50px;

  &:hover,
  &:focus,
  &:active {
    background: ${theme.neutralLight};
  }
`;

const Date = styled.div`
  flex: 1;
`;

const Name = styled(Link) `
  flex: 4;
  padding: 0 15px;
  color: ${theme.neutralDark};
`;

const ReadMore = styled.div`
  flex: 1;
  text-align: right;
  cursor: pointer;
  color: ${theme.themePrimary};
`;

export class Updates extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isReadingMore: false,
      name: '',
      desc: '',
    };
  }

  handleClickRead = (item = {}) => {
    const { isReadingMore } = this.state;
    this.setState({
      name: item.name,
      desc: item.desc,
      isReadingMore: !isReadingMore,
    });
  }

  renderCell = (item) => (
    <Item>
      <Date>{item.date}</Date>
      <Name to={item.to} href={item.href}>{item.name}</Name>
      <ReadMore onClick={() => this.handleClickRead(item)}>Read More</ReadMore>
    </Item>
  )

  render() {
    const { isMobile } = this.props;
    const { isReadingMore, name, desc } = this.state;

    return (
      <Wrapper isMobile={isMobile}>
        <h2>{isReadingMore ? name : 'Updates'}</h2>
        {
          isReadingMore ?
            <div>{desc}<ReadMore onClick={() => this.handleClickRead()}>Back</ReadMore></div> :
            <List
              items={updates}
              onRenderCell={this.renderCell}
            />
        }
      </Wrapper>
    );
  }
}

Updates.propTypes = {
  isMobile: PropTypes.bool.isRequired,
};

export default Updates;

