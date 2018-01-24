import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Section from 'components/App-Content/Section';
import { formatItem } from 'utils/data';
import { ACK } from 'containers/Spa/constants';
import { acknowledgment } from 'containers/Spa/data';
import theme from 'utils/theme';


export const Wrapper = Section.extend`
  flex: 2 0 250px;
  margin: ${theme.hub.padding / 2}px;
  overflow: auto;
`;


export const Heading = styled.h3`
  margin: 0 5px 10px 5px;
`;


export const Item = styled.div`
  display: inline-flex;
  width: 100%;
  padding: 5px;
`;


export const Key = styled.div`
  flex: 1;
  padding-right: 10px;
`;


export const Value = styled.div`
  flex: 3;
`;


export const items = [
  ACK.STATUS,
  ACK.START_DATE,
  ACK.END_DATE,
  ACK.TARGET_GROUPS,
  ACK.FILE_NAME,
  ACK.STATEMENT,
  ACK.DETAILS,
];


class Details extends React.PureComponent {
  render() {
    const { selectedItem, enums } = this.props;

    return (
      <Wrapper>
        <Heading>{selectedItem[ACK.TITLE]}</Heading>
        {
          items.map((name) => (
            <Item key={name}>
              <Key>{acknowledgment[name].label}</Key>
              <Value>{formatItem(selectedItem, name, acknowledgment[name], enums)}</Value>
            </Item>
          ))
        }
      </Wrapper>
    );
  }
}


const { object } = PropTypes;

Details.propTypes = {
  enums: object,
  selectedItem: object.isRequired,
};


export default Details;
