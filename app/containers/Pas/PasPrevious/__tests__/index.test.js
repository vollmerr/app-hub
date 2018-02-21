import React from 'react';
import { shallow } from 'enzyme';

import { testProps, testMapDispatchToProps } from '../../../../utils/testUtils';
import * as api from '../../../../utils/api';
import Loading from '../../../../components/Loading';
import List from '../../../../components/List';

import { getManagerDataRequest } from '../../actions';

import { PasPrevious, mapDispatchToProps } from '../index';


const managerItems = [
  { sid: 'sid1', text: 'text 1' },
  { sid: 'sid2', text: 'text 2' },
];

const managerById = {
  [managerItems[0].sid]: managerItems[0],
  [managerItems[1].sid]: managerItems[1],
};

const props = {
  app: testProps.app,
  manager: {
    lastFetched: '01/02/2012',
  },
  managerItems,
  managerById,
  onGetManagerDataRequest: jest.fn(),
};


describe('<PasPrevious />', () => {
  let wrapper;
  let instance;
  beforeEach(() => {
    jest.resetAllMocks();
    wrapper = shallow(<PasPrevious {...props} />);
    instance = wrapper.instance();
  });


  describe('componentDidMount', () => {
    it('should dispatch `onGetManagerDataRequest` if not cached', async () => {
      jest.resetAllMocks();
      api.shouldFetch = jest.fn(() => true);
      await instance.componentDidMount();
      expect(props.onGetManagerDataRequest).toHaveBeenCalled();
    });

    it('should not dispatch `onGetManagerDataRequest` if cached', async () => {
      jest.resetAllMocks();
      api.shouldFetch = jest.fn(() => false);
      await instance.componentDidMount();
      expect(props.onGetManagerDataRequest).not.toHaveBeenCalled();
    });
  });


  describe('buildColumns', () => {
    it('should bind `renderColumn` to each column', () => {
      const onRender = jest.fn();
      instance.renderColumn = jest.fn((col) => onRender(col));
      const columns = [{ name: 'col1' }, { name: 'col2' }];
      const expected = [
        { ...columns[0], onRender: instance.renderColumn(columns[0]) },
        { ...columns[1], onRender: instance.renderColumn(columns[1]) },
      ];
      const actual = instance.buildColumns(columns);
      expect(actual).toEqual(expected);
    });
  });


  xdescribe('renderColumn', () => {
    it('should be tested...', () => {
      // TODO: tests
    });
  });


  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render the loading/error indicator if loading or an error', () => {
      wrapper.setProps({ app: { ...props.app, loading: 1 } });
      expect(wrapper.find(Loading).length).toEqual(1);
    });

    it('should render a `List`', () => {
      expect(wrapper.find(List).length).toEqual(1);
    });
  });


  describe('mapDispatchToProps', () => {
    const actions = {
      getManagerDataRequest,
    };

    testMapDispatchToProps(mapDispatchToProps, actions);
  });
});
