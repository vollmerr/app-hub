import React from 'react';

import Section from 'components/App-Content/Section';


export class Report extends React.PureComponent {
  render() {
    const { item, modalProps } = this.props; // eslint-disable-line

    return (
      <Section>
        {JSON.stringify(item)}

      </Section>
    );
  }
}

export default Report;
