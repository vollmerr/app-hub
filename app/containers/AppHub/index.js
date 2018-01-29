import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';

import Header from './Header';
import * as selectors from './selectors';


export const Wrapper = styled(Fabric) `
  height: 100%;
  overflow: hidden;
`;


export class AppHub extends React.PureComponent {
  render() {
    return (
      <Wrapper>
        <Header />
        {
          isAuthenticated ?
            <Router routes={routes} /> :
            <Loading pastDelay {...this.props.app} />
        }
      </Wrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectors.getIsAuthenticated,
});


export default compose(
  withSaga,
  withConnect,
)(AppHub);

// tests....
