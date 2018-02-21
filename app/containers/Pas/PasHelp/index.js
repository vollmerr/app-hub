import React from 'react';

import Help from '../../../components/Help';

import sections from './sections';


export class PasHelp extends React.PureComponent {
  render() {
    const helpProps = {
      sections,
      title: 'PAS Help',
    };

    return (
      <Help {...helpProps} />
    );
  }
}


export default PasHelp;
