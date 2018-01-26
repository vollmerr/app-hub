import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import sortBy from 'lodash/sortBy';
import json2csv from 'json2csv';

import theme from 'utils/theme';
import { formattedDate } from 'utils/date';
import { downloadFile } from 'utils/request';
import { formatList } from 'utils/data';
import { reportCsv } from 'containers/Paas/data';
import * as C from 'containers/Paas/constants';


export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  flex: 1 0 auto;
  margin: 5px;
  padding: 15px;
  background: ${theme.white};
  box-shadow: 0 0 3px ${theme.neutralLight};
  overflow: auto;

  > button {
    align-self: center;
  }
`;


class Filters extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        [C.AUTH.AUTH_YEAR]: [{ key: 'ALL', text: 'All' }],
      },
    };
  }

  componentDidMount() {
    this.buildOptions();
  }

  /**
   * Builds filter options based off available values
   * from the `allItems` array of items
   */
  buildOptions = () => {
    const { authorizations } = this.props;
    const options = {
      [C.AUTH.AUTH_YEAR]: [],
    };
    const found = {
      [C.AUTH.AUTH_YEAR]: {},
    };
    let key;
    // for all authorization items
    authorizations.all.forEach((item) => {
      // for all the filter options
      Object.keys(options).forEach((option) => {
        key = item[option];
        // if the filters value hasnt been found for this option
        if (!found[option][key]) {
          // mark as found and add to options
          found[option][key] = 1;
          options[option].push({
            key,
            text: key,
          });
        }
      });
    });
    // sort then add the 'ALL' option to each filter as the first option
    Object.keys(options).forEach((option) => {
      options[option] = sortBy(options[option], 'key').reverse();
      options[option].unshift({ key: 'ALL', text: 'All' });
    });
    // update...
    this.setState({ options });
  }

  /**
   * Handles downloading the report as a csv
   */
  handleDownload = () => {
    const { authorizations, selectedKey } = this.props;
    const data = formatList(authorizations[selectedKey], reportCsv);
    const csv = json2csv({ data, newLine: '\r\n', ...reportCsv });
    const name = `PAAS Report ${formattedDate(new Date())}.csv`;
    const type = 'data:text/csv;charset=utf-8;';

    downloadFile(csv, name, type);
  }

  render() {
    const { onChange } = this.props;
    const { options } = this.state;

    return (
      <Wrapper>
        <Dropdown
          defaultSelectedKey={'ALL'}
          label={'Report Year'}
          options={options[C.AUTH.AUTH_YEAR]}
          onChanged={onChange(C.AUTH.AUTH_YEAR)}
        />
        <DefaultButton
          iconProps={{ iconName: 'download' }}
          text={'Download CSV'}
          onClick={this.handleDownload}
        />
      </Wrapper>
    );
  }
}


const { number, func, object } = PropTypes;

Filters.propTypes = {
  selectedKey: number,
  authorizations: object,
  onChange: func.isRequired,
};

Filters.defaultProps = {
  allItems: [],
};


export default Filters;
