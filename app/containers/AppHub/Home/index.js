import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';

import toJS from '../../../hocs/toJS';
import theme from '../../../utils/theme';
import { escapeRegExp } from '../../../utils/string';

import * as selectors from '../selectors';

import Search from './Search';
import AppTiles from './AppTiles';
import MessageSection from './MessageSection';


export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - ${theme.hub.headerHeight}px);
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


export class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      appRoutes: this.props.user.routes.slice(1), // remove 'AppHub' Tile
    };
  }

  /**
   * Filters list of apps being displayed
   */
  handleChangeSearch = (value) => {
    const { user } = this.props;
    const re = new RegExp(escapeRegExp(value), 'i');
    // remove 'AppHub' route then filter based off search input
    const appRoutes = user.routes.slice(1).filter((route) => {
      const { title, desc, keywords } = route.meta;
      const toFilter = `${title} ${desc} ${keywords} ${route.name}`;
      return toFilter.match(re);
    });

    this.setState({ appRoutes });
  }

  render() {
    const { view } = this.props;
    const { appRoutes } = this.state;
    const { isMobile } = view;

    return (
      <Wrapper>
        <UpperSection>
          <Container>
            <Search isMobile={isMobile} onChange={this.handleChangeSearch} />
            <AppTiles routes={appRoutes} />
          </Container>
        </UpperSection>
        <LowerSection isMobile={isMobile}>
          <MessageSection isMobile={isMobile} />
        </LowerSection>
      </Wrapper>
    );
  }
}


const { object } = PropTypes;

Home.propTypes = {
  view: object.isRequired,
  user: object.isRequired,
};


const mapStateToProps = createStructuredSelector({
  view: selectors.getView,
  user: selectors.getUser,
});

const withConnect = connect(mapStateToProps);


export default compose(
  withConnect,
  toJS,
)(Home);
