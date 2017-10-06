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
import Apps from './Apps';

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
  min-height: 40%;
`;

const LowerSection = UpperSection.extend`
  min-height: 60%;
  background: ${theme.neutralLight};
`;

const Text = styled.div`
  background: ${theme.neutralLighter};
  height: 80%;
  width: 50%;
  padding: 15px;
  box-shadow: 0 0 15px ${theme.neutralTertiaryAlt};
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
          <Apps />
        </UpperSection>
        <LowerSection>
          <Text>
            placeholder
          </Text>
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
