import React from 'react';
import PropTypes from 'prop-types';
import { DetailsList } from 'office-ui-fabric-react/lib/DetailsList';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import orderBy from 'lodash/orderBy';

import { escapeRegExp } from 'utils/string';

import Wrapper from './Wrapper';
import Title from './Title';
import Search from './Search';
import Header from './Header';
import EmptyMessage from './EmptyMessage';


/**
 * Helper function to handle selecting a single item from a list
 * Unselects the item so it can immediately be selected again
 *
 * Must be bound to a component to update `selectedItem` to the
 * item selected. Calls the callback with item if passed one.
 *
 * @param {object} component    - component to set state on (will be `this`)
 * @param {object} selection    - instance of `Selection` to use
 * @param {func} callback       - called if item is selected
 */
export const handleSelectItem = (component, selection, callback) => {
  const count = selection.getSelectedCount();
  // default to object so no error in modal
  let item = {};
  // if there are any selected items
  if (count) {
    // get the item from the selction object
    item = selection.getSelection()[0];
    // get the index of the selected item
    const index = selection.getSelectedIndices()[0];
    // unselect that item, so it can be reselected later
    selection.toggleKeySelected(index);
  }
  // set that item as selected, do callback if one is actually selected
  component.setState({ selectedItem: item }, () => (
    callback && item.id ? callback(item) : null
  ));
};


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
    // bind onClick's to bloumn headers
    this.bindColumnClick();
  }

  componentWillReceiveProps(nextProps) {
    // if we recieve items when currently empty, update to new items
    if (!this.props.items.length && nextProps.items.length) {
      this.setState({ items: nextProps.items });
    }
  }

  /**
   * Binds the method for clicking on a column header to each column
   */
  bindColumnClick = () => {
    const { columns } = this.state;
    const newColumns = columns.map((col) => ({
      ...col,
      ...!col.notSortable && { onColumnClick: this.handleColumnClick },
    }));
    this.setState({ columns: newColumns });
  };

  /**
   * Handles filtering list items displayed based off value
   *
   * @param {string} value         - value to filter results by
   */
  handleSearch = (value) => {
    const re = new RegExp(escapeRegExp(value), 'i');
    const items = this.props.items.filter((item) => (
      Object.values(item).some((x) => re.test(x))
    ));
    this.setState({ items });
  }

  /**
   * Handles clicking on a column header
   *
   * @param {event} event         - click event on column header
   * @param {object} column       - column clicked on
   */
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

  /**
   * Handles sorting columns by the given sort order
   *
   * @param {object} columns      - columns of list
   * @param {string} selectedKey  - key of selected column
   */
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

  /**
   * Renders the header row, displaying a tooltip if provided
   * an arialLabel
   *
   * @param {object} props        - header props
   * @param {func} defaultRender  - default render provided by DetailsList
   *
   * @return {JSX}                - column header
   */
  renderHeader = (props, defaultRender) => (
    defaultRender({
      ...props,
      onRenderColumnHeaderTooltip: (tooltipHostProps) => (
        tooltipHostProps.content ?
          <TooltipHost {...tooltipHostProps} /> :
          <div>{tooltipHostProps.children}</div>
      ),
    })
  )

  /**
   * Renders columns in a custom format
   *
   * @param {object} item     - current item (row) of list
   * @param {number} index    - index of current item
   * @param {object} column   - column to render
   *
   * @return {string}         - content to render
   */
  renderItemColumn = (item, index, column) => {
    let content = item[column.fieldName];

    // convert arrays to csv strings
    if (content.join) {
      content = content.join(', ');
    }

    return String(content);
  }

  render() {
    const { title, empty, ...list } = this.props;
    const { items, columns } = this.state;

    const listProps = {
      ...list,
      items,
      columns,
      onRenderDetailsHeader: this.renderHeader,
      onRenderItemColumn: this.renderItemColumn,
      componentRef: (ref) => { this.listRef = ref; },
    };

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
            <DetailsList {...listProps} /> :
            <EmptyMessage {...empty} />
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
  empty: any,
};

List.defaultProps = {
  items: [],
  empty: {
    message: 'No items',
  },
};

export default List;
