import React from 'react';
import { shallow } from 'enzyme';
import { DetailsList } from 'office-ui-fabric-react/lib/DetailsList';

import List from '../index';
import Title from '../Title';
import Search from '../Search';


const props = {
  title: 'test title',
  items: [
    { name: 'name 2', test: 1, other: '1989/22/08' },
    { name: 'name 1', test: 7, other: '2001/11/01' },
    { name: 'stuff', test: 1, other: '2000/12/01' },
  ],
  columns: [
    { key: 'name', name: 'name', fieldName: 'name' },
    { key: 'test', name: 'test', fieldName: 'test', notSortable: true },
    { key: 'other', name: 'other', fieldName: 'other' },
  ],
};


describe('<List />', () => {
  let wrapper;
  let instance;
  beforeEach(() => {
    wrapper = shallow(<List {...props} />);
    instance = wrapper.instance();
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a title', () => {
    expect(wrapper.find(Title).length).toEqual(1);
    expect(wrapper.find(Title).dive().text()).toEqual(props.title);
  });

  it('should render a search box', () => {
    expect(wrapper.find(Search).length).toEqual(1);
    expect(wrapper.find(Search).prop('onChange')).toEqual(instance.handleSearch);
  });

  it('should render a list of items', () => {
    expect(wrapper.find(DetailsList).length).toEqual(1);
    expect(wrapper.find(DetailsList).prop('items')).toEqual(wrapper.state('items'));

    wrapper.setState({ items: props.items.slice(1) });
    expect(wrapper.find(DetailsList).prop('items')).toEqual(wrapper.state('items'));
  });

  describe('comonentDidMount', () => {
    it('should bind `handleColumnClick` to columns without `notSortable`', () => {
      const columns = wrapper.state('columns');
      expect(columns[0].onColumnClick).toEqual(instance.handleColumnClick);
      expect(columns[1].onColumnClick).toEqual(undefined);
      expect(columns[2].onColumnClick).toEqual(instance.handleColumnClick);
    });
  });

  describe('handleSearch', () => {
    it('should filter the items based off input', () => {
      instance.handleSearch('');
      expect(wrapper.state('items')).toEqual(props.items);

      instance.handleSearch('nam');
      expect(wrapper.state('items')).toEqual(props.items.slice(0, 2));

      instance.handleSearch('2/');
      expect(wrapper.state('items')).toEqual([props.items[0], props.items[2]]);

      instance.handleSearch('');
      expect(wrapper.state('items')).toEqual(props.items);
    });
  });

  describe('handleColumnClick', () => {
    let selected;
    let expected;
    beforeEach(() => {
      selected = 0;
      expected = props.columns.map((col) => ({
        ...col,
        ...!col.notSortable && { onColumnClick: instance.handleColumnClick },
      }));
      expected[selected].isSorted = true;
      expected[selected].isSortedDescending = true;
      instance.handleSort = jest.fn();
    });


    it('should update all columns sorted status', () => {
      instance.handleColumnClick(null, props.columns[selected]);
      expect(wrapper.state('columns')).toEqual(expected);
    });

    it('should toggle sorting (asc > desc > none)', () => {
      // toggle to isSortedDescending
      instance.handleColumnClick(null, props.columns[selected]);
      expect(wrapper.state('columns')).toEqual(expected);
      // toggle to not isSortedDescending
      expected[selected].isSortedDescending = false;
      instance.handleColumnClick(null, props.columns[selected]);
      expect(wrapper.state('columns')).toEqual(expected);
      // toggle to not sorted
      expected[selected].isSorted = false;
      expected[selected].isSortedDescending = undefined;
      instance.handleColumnClick(null, props.columns[selected]);
      expect(wrapper.state('columns')).toEqual(expected);
    });

    it('should call `handleSort` to sort the items', () => {
      instance.handleColumnClick(null, props.columns[selected]);
      expect(instance.handleSort).toHaveBeenCalledWith(expected, expected[selected].key);
    });
  });

  describe('handleSort', () => {
    it('should update the sort order and sort the items', () => {
      let items = [
        props.items[0],
        props.items[2],
        props.items[1],
      ];
      let sortOrder = [
        props.columns[2].key,
        props.columns[0].key,
        props.columns[1].key,
      ];
      let selected = props.columns[2].key;
      instance.handleSort(props.columns, selected);
      expect(wrapper.state('items')).toEqual(items);
      expect(wrapper.state('sortOrder')).toEqual(sortOrder);

      // manually update since columns not updated in search
      const columns = wrapper.state('columns');
      columns[2].isSorted = true;
      columns[2].isSortedDescending = true;

      items = [
        props.items[1],
        props.items[0],
        props.items[2],
      ];
      sortOrder = [
        props.columns[0].key,
        props.columns[2].key,
        props.columns[1].key,
      ];
      selected = props.columns[0].key;
      instance.handleSort(columns, selected);
      expect(wrapper.state('items')).toEqual(items);
      expect(wrapper.state('sortOrder')).toEqual(sortOrder);
    });
  });
});