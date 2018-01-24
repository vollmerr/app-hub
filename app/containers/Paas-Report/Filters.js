import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';

import theme from 'utils/theme';


export const Wrapper = styled.div`
  flex: 2 0 50vh;
  margin: 5px;
  padding: 15px;
  background: ${theme.white};
  box-shadow: 0 0 3px ${theme.neutralLight};
  overflow: auto;
`;


// export const Heading = styled.h3`
//   margin: 0 5px 10px 5px;
// `;


// export const Item = styled.div`
//   display: inline-flex;
//   width: 100%;
//   padding: 5px;
// `;

// export const Key = styled.div`
//   flex: 1;
//   padding-right: 10px;
// `;


// export const Value = styled.div`
//   flex: 3;
// `;


// export const items = [
//   ACK.STATUS,
//   ACK.START_DATE,
//   ACK.END_DATE,
//   ACK.TARGET_GROUPS,
//   ACK.FILE_NAME,
//   ACK.STATEMENT,
//   ACK.DETAILS,
// ];

class Filters extends React.PureComponent {
  render() {
    // const { selectedItem, enums } = this.props;

    return (
      <Wrapper>
        {/* <Heading>{selectedItem[ACK.TITLE]}</Heading>
        {
          items.map((name) => (
            <Item key={name}>
              <Key>{acknowledgment[name].label}</Key>
              <Value>{formatItem(selectedItem, name, acknowledgment[name], enums)}</Value>
            </Item>
          ))
        } */}
        <Dropdown
          label={'Report Year'}
          options={[
            { key: '2017', text: '2017' },
            { key: '2016', text: '2016' },
            { key: '2015', text: '2015' },
            { key: '2014', text: '2014' },
          ]}
        />
      </Wrapper>
    );
  }
}


// const { object } = PropTypes;

Filters.propTypes = {

};

export default Filters;
