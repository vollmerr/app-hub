import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';

import { escapeRegExp } from 'utils/string';
import theme from 'utils/theme';
import { makeSelectIsMobile, getUserRoutes } from 'containers/AppHub/selectors';

import Apps from './Apps';
import Search from './Search';
import Updates from './Updates';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
`;

export const Container = styled.div`
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


export const UpperSection = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  flex: 1;
  background: ${theme.themeDarker};
  min-height: 300px;
`;


export const LowerSection = UpperSection.extend`
  background: ${theme.neutralLight};
  padding: ${(props) => props.isMobile ? '0' : '15px'};
`;


export class AppHubHome extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      appRoutes: this.props.userRoutes.toJS(),
    };
  }

  /**
   * Filters list of apps being displayed
   */
  handleChangeSearch = (value) => {
    const { userRoutes } = this.props;
    const re = new RegExp(escapeRegExp(value), 'i');

    const appRoutes = userRoutes.filter((route) => {
      const { title, desc, keywords } = route.get('meta').toJS();
      const toFilter = `${title} ${desc} ${keywords} ${route.get('name')}`;
      return toFilter.match(re);
    }).toJS();

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


const { bool, object } = PropTypes;

AppHubHome.propTypes = {
  isMobile: bool.isRequired,
  userRoutes: object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isMobile: makeSelectIsMobile(),
  userRoutes: getUserRoutes(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
)(AppHubHome);
