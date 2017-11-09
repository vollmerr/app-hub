import React from 'react';
import PropTypes from 'prop-types';
import { DetailsList } from 'office-ui-fabric-react/lib/DetailsList';
import orderBy from 'lodash/orderBy';

import { escapeRegExp } from 'utils/string';

import Wrapper from './Wrapper';
import Title from './Title';
import Search from './Search';
import Header from './Header';
import EmptyMessage from './EmptyMessage';


class List extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: props.items,
      columns: props.columns,
      sortOrder: props.columns.map((col) => col.key),
    };
  }

  componentDidMount() {
    this.bindColumnClick();
  }

  bindColumnClick = () => {
    const { columns } = this.state;
    const newColumns = columns.map((col) => ({
      ...col,
      ...!col.notSortable && { onColumnClick: this.handleColumnClick },
    }));
    this.setState({ columns: newColumns });
  };

  handleSearch = (value) => {
    const re = new RegExp(escapeRegExp(value), 'i');
    const items = this.props.items.filter((item) => (
      Object.values(item).some((x) => re.test(x))
    ));
    this.setState({ items });
  }

  handleColumnClick = (event, column) => {
    const { columns } = this.state;
    const selected = columns.findIndex((col) => col.key === column.key);
    const newColumns = [...columns];

    // 3 way state -> desc (true), asc (false), not sorted (undefined)
    const isDesc = columns[selected].isSortedDescending;
    if (isDesc === undefined || isDesc) {
      newColumns[selected].isSorted = true;
      newColumns[selected].isSortedDescending = !columns[selected].isSortedDescending;
    } else {
      newColumns[selected].isSorted = false;
      newColumns[selected].isSortedDescending = undefined;
    }

    this.setState({ columns: newColumns });
    this.handleSort(newColumns, newColumns[selected].key);
  }

  handleSort = (columns, selectedKey) => {
    const { items, sortOrder } = this.state;
    // move unsorted to end of list
    const sorted = [];
    const unSorted = [];
    sortOrder.forEach((key) => {
      if (columns[columns.findIndex((x) => x.key === key)].isSortedDescending === undefined) {
        unSorted.push(key);
      } else {
        sorted.push(key);
      }
    });
    // move selected to front of list
    const newSortOrder = [...sorted, ...unSorted];
    const selected = newSortOrder.findIndex((key) => key === selectedKey);
    newSortOrder.splice(selected, 1);
    newSortOrder.unshift(selectedKey);
    // build keys and isDesc for sort order
    const isDesc = newSortOrder.reduce((acc, key) => {
      const column = columns.find((col) => col.key === key);
      const desc = (column && column.isSortedDescending) ? 'desc' : 'asc';
      return [...acc, desc];
    }, []);
    // sort and update state
    const newItems = orderBy(items, newSortOrder, isDesc);
    this.setState({ items: newItems, sortOrder: newSortOrder });
  }

  render() {
    const { title, emptyMessage, ...listProps } = this.props;
    const { items, columns } = this.state;
console.log(listProps)
    return (
      <Wrapper>
        <Header>
          <Title>{title}</Title>
          <Search
            onChange={this.handleSearch}
          />
        </Header>

        {
          this.props.items.length ?
            <DetailsList
              {...listProps}
              items={items}
              columns={columns}
            /> :
            <EmptyMessage>{emptyMessage}</EmptyMessage>
        }
      </Wrapper>
    );
  }
}


const { string, number, arrayOf, shape, any } = PropTypes;

List.propTypes = {
  title: string,
  items: arrayOf(any),
  columns: arrayOf(
    shape({
      key: string,
      name: string,
      fieldName: string,
    }),
  ),
  checkboxVisibility: number,
  emptyMessage: string,
};

List.defaultProps = {
  items: [],
  emptyMessage: 'No items',
};

export default List;
