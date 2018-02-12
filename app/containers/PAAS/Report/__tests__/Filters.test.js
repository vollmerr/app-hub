import React from 'react';
import { shallow } from 'enzyme';

import { testStyledComponent } from '../../../../utils/testUtils';

import * as C from '../../constants';

import Filters, { Wrapper } from '../Filters';


testStyledComponent(Wrapper);


const props = {
  data: [
    { title: 'second', [C.AUTH.AUTH_YEAR]: 2003 },
    { title: 'first', [C.AUTH.AUTH_YEAR]: 2007 },
    { title: 'last', [C.AUTH.AUTH_YEAR]: 2001 },
  ],
  onChange: jest.fn(),
};


describe('Filters', () => {
  let wrapper;
  let instance;
  beforeEach(() => {
    wrapper = shallow(<Filters {...props} />);
    instance = wrapper.instance();
  });


  describe('componentDidMount', () => {
    it('should build the options', () => {
      instance.buildOptions = jest.fn();
      instance.componentDidMount();
      expect(instance.buildOptions).toHaveBeenCalled();
    });
  });


  describe('buildOptions', () => {
    it('should build sorted options then update local state', () => {
      instance.buildOptions();
      const options = wrapper.state('options')[C.AUTH.AUTH_YEAR];
      expect(options[0].key).toEqual('ALL');
      expect(options[1].key).toEqual(props.data[1][C.AUTH.AUTH_YEAR]);
      expect(options[3].key).toEqual(props.data[2][C.AUTH.AUTH_YEAR]);
    });

    it('should create unique values', () => {
      const data = [
        ...props.data,
        { title: 'second duplicate', [C.AUTH.AUTH_YEAR]: 2003 },
      ];
      wrapper.setProps({ data });
      instance.buildOptions();
      const options = wrapper.state('options')[C.AUTH.AUTH_YEAR];
      expect(options[0].key).toEqual('ALL');
      expect(options[1].key).toEqual(props.data[1][C.AUTH.AUTH_YEAR]);
      expect(options[3].key).toEqual(props.data[2][C.AUTH.AUTH_YEAR]);
    });
  });


  xdescribe('handleDownload', () => {
    it('should be tested...', () => {
      // TODO: tests
    });
  });


  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
