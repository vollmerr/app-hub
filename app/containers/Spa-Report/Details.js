import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import theme from 'utils/theme';
import { ACK } from 'containers/Spa/constants';
import spaFields from 'containers/Spa/fields';

export const Wrapper = styled.div`
  flex: 1;
  margin: 5px;
  padding: 15px;
  background: ${theme.white};
  box-shadow: 0 0 3px ${theme.neutralLight};
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
  ACK.DATE_START,
  ACK.DATE_END,
  ACK.TARGET_GROUPS,
  ACK.FILE_NAME,
  ACK.STATEMENT,
  ACK.DETAILS,
];

class Details extends React.PureComponent {
  render() {
    const { selectedItem } = this.props;

    return (
      <Wrapper>
        <Heading>{selectedItem[ACK.TITLE]}</Heading>
        {
          items.map((item) => (
            <Item key={item}>
              <Key>{spaFields[item].label}</Key>
              <Value>{selectedItem[item]}</Value>
            </Item>
          ))
        }
      </Wrapper>
    );
  }
}


const { object } = PropTypes;

Details.propTypes = {
  selectedItem: object.isRequired,
};

export default Details;
