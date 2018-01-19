import React from 'react';
import { shallow } from 'enzyme';

import { testMapDispatchToProps } from 'utils/testUtils';
import {
  getManagerDataRequest,
} from 'containers/Paas/actions';

import { PaasPrevious, mapDispatchToProps } from '../index';


const managerItems = [
  { sid: 'sid1', text: 'text 1' },
  { sid: 'sid2', text: 'text 2' },
];

const managerById = {
  [managerItems[0].sid]: managerItems[0],
  [managerItems[1].sid]: managerItems[1],
};

const props = {
  managerItems,
  managerById,
  onGetManagerDataRequest: jest.fn(),
  Loading: null,
};


describe('<PaasPrevious />', () => {
  let wrapper;
  let instance;
  beforeEach(() => {
    jest.resetAllMocks();
    wrapper = shallow(<PaasPrevious {...props} />);
    instance = wrapper.instance();
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the loading indicator if loading', () => {
    const Loading = () => <div>test loading...</div>;
    wrapper.setProps({ Loading: <Loading /> });
    expect(wrapper.find(Loading).length).toEqual(1);
  });


  describe('componentDidMount', () => {
    it('should dispatch `onGetManagerDataRequest` then initalize the form', async () => {
      instance.initalizeForm = jest.fn();
      await instance.componentDidMount();
      expect(props.onGetManagerDataRequest).toHaveBeenCalled();
      expect(instance.initalizeForm).toHaveBeenCalled();
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


  describe('initalizeForm', () => {
    // it('should dispatch `change` for all authorizations', () => {

    // });
  });

  describe('renderColumn', () => {
    // TODO !
  });


  describe('mapDispatchToProps', () => {
    const actions = {
      getManagerDataRequest,
    };

    testMapDispatchToProps(mapDispatchToProps, actions);
  });
});
