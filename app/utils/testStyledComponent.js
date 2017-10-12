import React from 'react';
import { shallow } from 'enzyme';


function testStyledComponent(Component) {
  describe(`<${Component.displayName} />`, () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Component />);
    });

    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it(`should render an <${Component.target}> tag`, () => {
      expect(wrapper.type()).toEqual(Component.target);
    });

    it('should have a className attribute', () => {
      expect(wrapper.prop('className')).toBeDefined();
    });

    it('should adopt a valid attribute', () => {
      const id = 'test';
      wrapper.setProps({ id });
      expect(wrapper.prop('id')).toEqual(id);
    });

    it('should not adopt an invalid attribute', () => {
      const attribute = 'test';
      wrapper.setProps({ attribute });
      expect(wrapper.prop('attribute')).toBeUndefined();
    });
  });
}

export default testStyledComponent;

