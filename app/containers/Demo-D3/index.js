import React from 'react';

import appPage from 'containers/App-Container/appPage';
import Content from 'components/App-Content/Content';

import DemoPieChart from './DemoPieChart';


export class DemoD3 extends React.PureComponent {
  render() {
    return (
      <Content>
        <DemoPieChart />
      </Content>
    );
  }
}


export default appPage(DemoD3);
