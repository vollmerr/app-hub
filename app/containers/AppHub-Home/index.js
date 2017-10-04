/**
 *
 * AppHubHome
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';

import theme from 'utils/theme';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import makeSelectAppHubHome from './selectors';
import reducer from './reducer';
import saga from './saga';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const UpperSection = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex: 1;
  background: ${theme.neutralLighterAlt};
  min-height: 75%;
  padding: 0 30px;
`;

const LowerSection = UpperSection.extend`
  min-height: 25%;
  background: ${theme.neutralLight};
`;

export class AppHubHome extends React.PureComponent {
  render() {
    return (
      <Wrapper>
        <Helmet>
          <title>AppHub | Home</title>
          <meta name="description" content="Description of AppHubHome" />
        </Helmet>
        <UpperSection>
          <h1>upper content</h1>
        </UpperSection>
        <LowerSection>
          lower content
        </LowerSection>
      </Wrapper>
    );
  }
}

AppHubHome.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  apphubhome: makeSelectAppHubHome(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'appHubHome', reducer });
const withSaga = injectSaga({ key: 'appHubHome', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AppHubHome);
