import React from 'react';
import { shallow } from 'enzyme';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';

import LoadingMessage from '../LoadingMessage';


describe('<LoadingMessage />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<LoadingMessage />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a spinner', () => {
    expect(wrapper.find(Spinner).length).toEqual(1);
  });

  it('should pass the spinner the text prop', () => {
    const text = 'test text';
    wrapper.setProps({ text });
    expect(wrapper.find(Spinner).prop('label')).toEqual(text);
  });
});
