import React from 'react';


export class Report extends React.PureComponent {
  render() {
    const { item, modalProps } = this.props; // eslint-disable-line

    return (
      <div>
        {JSON.stringify(item)}
      </div>
    );
  }
}

export default Report;
