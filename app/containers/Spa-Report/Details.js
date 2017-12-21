import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import theme from 'utils/theme';
import { renderItem } from 'utils/data';
import { COL_TYPES } from 'containers/AppHub/constants';
import { ACK, STATUS } from 'containers/Spa/constants';
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
  ACK.START_DATE,
  ACK.END_DATE,
  ACK.TARGET_GROUPS,
  ACK.FILE_NAME,
  ACK.STATEMENT,
  ACK.DETAILS,
];
// TODO: COMMON
// const renderItem = (name, selected, enums) => {
//   let content = selected[name];
//   // if non existent or not array of data, make into array
//   if (!Array.isArray(content)) {
//     content = [content];
//   }
//   // go through array of data, mapping each item absed off 'data' attributes
//   content = content.map((item) => {
//     // is enum mapping
//     if (enums[name]) {
//       return enums[name][item];
//     }
//     // is date
//     if (spaFields[name].data && spaFields[name].data.type === COL_TYPES.DATE) {
//       return isNaN(Date.parse(item)) ? '' : new Date(item).toISOString().substr(0, 10);
//     }
//     return item;
//   });

//   return content.join(', ');
// };

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
