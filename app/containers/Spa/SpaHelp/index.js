import React from 'react';

import Help from '../../../components/Help';

import sections from './sections';


export class SpaHelp extends React.PureComponent {
  render() {
    return (
      <Help title={'Spa Help'} sections={sections} />
    );
  }
}


export default SpaHelp;
