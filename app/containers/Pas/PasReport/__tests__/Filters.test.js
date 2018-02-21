import React from 'react';
import { shallow } from 'enzyme';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

import { testStyledComponent } from '../../../../utils/testUtils';
import * as C from '../../constants';

import { Filters, Wrapper, ExportButton } from '../Filters';


testStyledComponent(Wrapper);
testStyledComponent(ExportButton, DefaultButton);

const onChange = jest.fn();
const props = {
  data: [
    { title: 'second', [C.AUTH.AUTH_YEAR]: 2003 },
    { title: 'first', [C.AUTH.AUTH_YEAR]: 2007 },
    { title: 'last', [C.AUTH.AUTH_YEAR]: 2001 },
  ],
  onChange: () => onChange,
  roles: [],
  filteredData: [],
  isAdmin: true,
  sid: 'SID',
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


  describe('handleDownload', () => {
    it('should be tested...', () => {
      // TODO: tests
    });
  });

  describe('directReportToggle', () => {
    it('onChange is called with user sid on showDirects', () => {
      const showDirects = true;
      instance.directReportToggle(showDirects);
      expect(onChange).toHaveBeenCalledWith({ key: props.sid });
    });

    it('onChange is called with `All` if not showDirects', () => {
      const showDirects = false;
      instance.directReportToggle(showDirects);
      expect(onChange).toHaveBeenCalledWith({ key: 'ALL' });
    });

    it('should update local state', () => {
      const showDirects = false;
      instance.directReportToggle(showDirects);
      expect(wrapper.state('checkedShow')).toEqual(showDirects);
    });
  });


  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should display Toggle if manager and admin.', () => {
      wrapper.setProps({ roles: [C.ROLES.MANAGER] });
      expect(wrapper.find(Toggle).length).toEqual(1);
    });

    it('should not display Toggle if manager only.', () => {
      wrapper.setProps({ roles: [C.ROLES.MANAGER], isAdmin: false });
      expect(wrapper.find(Toggle).length).toEqual(0);
    });
  });
});
