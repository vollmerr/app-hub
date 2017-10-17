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

import { escapeRegExp } from 'utils/string';
import theme from 'utils/theme';
import { makeSelectIsMobile } from 'containers/AppHub/selectors';

import makeSelectAppHubHome from './selectors';
import Apps from './Apps';
import Search from './Search';
import Updates from './Updates';

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


export class AppHubHome extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      appRoutes: this.props.routes,
    };
  }

  handleChangeSearch = (value) => {
    const { routes } = this.props;
    const re = new RegExp(escapeRegExp(value), 'i');

    const appRoutes = routes.filter((route) => {
      const { title, desc, keywords } = route.meta;
      const meta = `${title} ${desc} ${keywords}`;

      return meta.match(re);
    });

    this.setState({ appRoutes });
  }

  render() {
    const { isMobile } = this.props;
    const { appRoutes } = this.state;

    return (
      <Wrapper>
        <UpperSection>
          <Container>
            <Search isMobile={isMobile} onChange={this.handleChangeSearch} />
            <Apps routes={appRoutes} />
          </Container>
        </UpperSection>
        <LowerSection isMobile={isMobile}>
          <Updates isMobile={isMobile} />
        </LowerSection>
      </Wrapper>
    );
  }
}

AppHubHome.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  routes: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  apphubhome: makeSelectAppHubHome(),
  isMobile: makeSelectIsMobile(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
)(AppHubHome);
