import React from 'react';
import { shallow } from 'enzyme';

import * as C from '../../constants';

import Panel from '../../../../components/Panel';

import { Panels } from '../index';
import panels from '../panels';


const props = {
  user: {
    routes: [{ key: 'rotue1', name: 'route1', path: '/test' }],
  },
  view: {
    isMobile: false,
  },
  panel: {
    name: C.HELP_PANEL,
    isOpen: true,
  },
  onClick: jest.fn(),
};


describe('<Panels />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Panels {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a `Panel`', () => {
    expect(wrapper.find(Panel).length).toEqual(1);
  });

  it('should render the correct panel based off `panel`', () => {
    Object.keys(panels).forEach((panel) => {
      wrapper.setProps({ panel: { name: panel, isOpen: true } });
      expect(wrapper.find(panels[panel].component).length).toEqual(1);
    });

    expect(wrapper.children().length).toEqual(1);
  });

  it('should call the `onClick` with nothing when clicking on content (not a panel)', () => {
    wrapper.find(panels[props.panel.name].component).simulate('click');
    expect(props.onClick).toHaveBeenCalledWith(null);
  });
});
