import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { List } from 'office-ui-fabric-react/lib/List';

import Link from '../../../components/Link';
import theme from '../../../utils/theme';

import messages from './messages';


export const Wrapper = styled.div`
  background: ${theme.neutralLighter};
  padding: 25px;
  height: 100%;
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


class MessageSection extends React.PureComponent {
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
              items={messages}
              onRenderCell={this.renderCell}
            />
        }
      </Wrapper>
    );
  }
}


const { bool } = PropTypes;

MessageSection.propTypes = {
  isMobile: bool.isRequired,
};


export default MessageSection;
