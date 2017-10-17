import React from 'react';
import { shallow } from 'enzyme';
import { Route } from 'react-router-dom';

import CodeSplitting, { StyledLink, ExamplesNav, ExamplesHome } from '../index';

describe('<CodeSplitting />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<CodeSplitting />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a nav', () => {
    expect(wrapper.find(ExamplesNav).length).toEqual(1);
  });

  it('should render some routes', () => {
    expect(wrapper.find(Route).exists()).toEqual(true);
  });
});

describe('<ExamplesHome />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ExamplesHome />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<ExamplesNav />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ExamplesNav />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should contain styled links', () => {
    expect(wrapper.find(StyledLink).exists()).toEqual(true);
  });
});
