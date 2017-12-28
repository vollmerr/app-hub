import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';

import appPage from 'containers/App-Container/appPage';
// import { makeSelectApp } from 'containers/AppHub/selectors';


export class PaasHome extends React.PureComponent {
  render() {
    const { Loading } = this.props;

    if (Loading) {
      return Loading;
    }

    return (
      <div>PLACHOLDER</div>
    );
  }
}


const { node } = PropTypes;

PaasHome.propTypes = {
  Loading: node,
};

// const mapStateToProps = createStructuredSelector({
//  app: makeSelectApp(),
// });

// const mapDispatchToProps = {};

const withAppPage = appPage(PaasHome);

// export default connect(mapStateToProps, mapDispatchToProps)(withAppPage);
export default withAppPage;
