import React from 'react';

import Help from '../../../components/Help';

import sections from './sections';


export class PaasHelp extends React.PureComponent {
  render() {
    return (
      <Help title={'Paas Help'} sections={sections} />
    );
  }
}


export default PaasHelp;
