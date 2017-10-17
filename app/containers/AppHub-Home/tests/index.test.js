import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';

import { testStyledComponent } from 'utils/testUtils';

import { AppHubHome, Wrapper, Container, UpperSection, LowerSection } from '../index';
import Apps from '../Apps';
import Search from '../Search';
import Updates from '../Updates';


testStyledComponent(Wrapper);
testStyledComponent(Container);
testStyledComponent(UpperSection);
testStyledComponent(LowerSection);

describe('<LowerSection />', () => {
  const wrapper = shallow(<LowerSection isMobile />);
  expect(wrapper).toMatchSnapshot();
});

const routes = [
  { key: '1', exact: true, path: 'path1', component: () => <div>1</div>, meta: { title: 'test 1' } },
  { key: '2', exact: false, path: 'path2', component: () => <div>2</div>, meta: { title: 'test 3' } },
  { key: '3', href: 'testHref', meta: { title: 'test 1' } },
];

const props = {
  routes,
  isMobile: false,
};


describe('<AppHubHome />', () => {
  let wrapper;
  let instance;
  beforeEach(() => {
    wrapper = shallow(<AppHubHome {...props} />);
    instance = wrapper.instance();
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('upper section', () => {
    it('should render', () => {
      expect(wrapper.find(UpperSection).length).toEqual(1);
    });

    it('should render a search', () => {
      expect(wrapper.find(UpperSection).find(Search).length).toEqual(1);
      expect(wrapper.find(UpperSection).find(Search).prop('isMobile')).toEqual(props.isMobile);
      expect(wrapper.find(UpperSection).find(Search).prop('onChange')).toEqual(instance.handleChangeSearch);
    });

    it('should render apps', () => {
      expect(wrapper.find(UpperSection).find(Apps).length).toEqual(1);
      expect(wrapper.find(UpperSection).find(Apps).prop('routes')).toEqual(wrapper.state('appRoutes'));
    });
  });

  describe('lower section', () => {
    it('should render', () => {
      expect(wrapper.find(LowerSection).length).toEqual(1);
      expect(wrapper.find(LowerSection).prop('isMobile')).toEqual(props.isMobile);
    });

    it('should render updates', () => {
      expect(wrapper.find(LowerSection).find(Updates).length).toEqual(1);
      expect(wrapper.find(LowerSection).find(Updates).prop('isMobile')).toEqual(props.isMobile);
    });
  });

  describe('handleChangeSearch', () => {
    it('should update `appRoutes` based off the inputed value', () => {
      instance.handleChangeSearch('1');
      expect(wrapper.state('appRoutes')).toEqual([routes[0], routes[2]]);
      instance.handleChangeSearch('3');
      expect(wrapper.state('appRoutes')).toEqual([routes[1]]);
      instance.handleChangeSearch('123');
      expect(wrapper.state('appRoutes')).toEqual([]);
    });
  });
});
