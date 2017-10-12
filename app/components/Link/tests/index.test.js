import React from 'react';
import { shallow } from 'enzyme';

import Link, { StyledLink, A } from '../index';

const Children = () => <div>test children</div>;


describe('<Link />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Link><Children /></Link>);
  });

  it('should render an anchor by default', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(A).length).toEqual(1);
  });

  describe('external links (href)', () => {
    const href = 'http://test.com';
    beforeEach(() => {
      wrapper.setProps({ href });
    });

    it('should render an anchor', () => {
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.find(A).length).toEqual(1);
      expect(wrapper.find(A).prop('href')).toEqual(href);
    });

    it('should redner its children', () => {
      expect(wrapper.find(Children).length).toEqual(1);
    });
  });

  describe('internal links (to)', () => {
    const to = '/test-route';
    beforeEach(() => {
      wrapper.setProps({ to });
    });

    it('should render a react-router Link', () => {
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.find(StyledLink).length).toEqual(1);
      expect(wrapper.find(StyledLink).prop('to')).toEqual(to);
    });

    it('should redner its children', () => {
      expect(wrapper.find(Children).length).toEqual(1);
    });
  });
});
