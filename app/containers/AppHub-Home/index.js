/**
 *
 * AppHubHome
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';

import { apps } from 'containers/AppHub/routes';
import theme from 'utils/theme';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectIsMobile } from 'containers/AppHub/selectors';

import makeSelectAppHubHome from './selectors';
import reducer from './reducer';
import saga from './saga';
import Apps from './Apps';
import Search from './Search';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Container = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  padding: 15px;

  width: ${theme.breakpoints.xs - 10}px;
  @media (min-width: ${theme.breakpoints.sm}px) {
    width: ${theme.breakpoints.sm - 10}px;
  }
  @media (min-width: ${theme.breakpoints.md}px) {
    width: ${theme.breakpoints.md - 10}px;
  }
  @media (min-width: ${theme.breakpoints.lg}px) {
    width: ${theme.breakpoints.lg - 10}px;
  }
  @media (min-width: ${theme.breakpoints.xl}px) {
    width: ${theme.breakpoints.xl - 10}px;
  }
`;

const UpperSection = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  flex: 1;
  background: ${theme.themeDarker};
  min-height: 40%;
`;

const LowerSection = UpperSection.extend`
  min-height: 60%;
  background: ${theme.neutralLight};
  padding: ${(props) => props.isMobile ? '0' : '15px'};
`;

const Text = styled.div`
  background: ${theme.neutralLighter};
  height: ${(props) => props.isMobile ? '100%' : '80%'};
  width: 100%;
  max-width: 800px;
  ${(props) => !props.isMobile &&
    `box-shadow: 0 0 15px ${theme.neutralTertiaryAlt};`
  }
`;


export class AppHubHome extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      appRoutes: apps,
    };
  }

  // handleChangeSearch = (newValue) => {
  //   const newAppRoutes = routes.fitler()
  // }

  render() {
    const { isMobile } = this.props;
    const { appRoutes } = this.state;

    return (
      <Wrapper>
        <UpperSection>
          <Container>
            <Search isMobile={isMobile} />
            <Apps routes={appRoutes} />
          </Container>
        </UpperSection>
        <LowerSection isMobile={isMobile}>
          <Text isMobile={isMobile}>
            placeholder
          </Text>
        </LowerSection>
      </Wrapper>
    );
  }
}

AppHubHome.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  apphubhome: makeSelectAppHubHome(),
  isMobile: makeSelectIsMobile(),
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
