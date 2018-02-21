import React from 'react';

import Help from '../../../components/Help';

import sections from './sections';


export class PaasHelp extends React.PureComponent {
  render() {
    const helpProps = {
      sections,
      title: 'PAAS Help',
    };

    return (
      <Help {...helpProps} />
    );
  }
}


export default PaasHelp;
