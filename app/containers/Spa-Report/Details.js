import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import theme from 'utils/theme';
import { renderItem } from 'utils/data';
import { ACK } from 'containers/Spa/constants';
import spaFields from 'containers/Spa/fields';

export const Wrapper = styled.div`
  flex: 2 0 50vh;
  margin: 5px;
  padding: 15px;
  background: ${theme.white};
  box-shadow: 0 0 3px ${theme.neutralLight};
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
              <Key>{spaFields[name].label}</Key>
              <Value>{renderItem(selectedItem, name, spaFields[name], enums)}</Value>
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
