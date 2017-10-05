/**
 *
 * App
 *
 * Container for apps that are hosted in AppHub
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { changeApp } from 'containers/AppHub/actions';
import { makeSelectIsMobile, makeSelectAppMeta, makeSelectAppRoutes } from 'containers/AppHub/selectors';
import { initialState } from 'containers/AppHub/reducer';
import AppNav from 'containers/App-Nav';

import Wrapper from './Wrapper';

export class App extends React.PureComponent {
  componentDidMount() {
    const { app } = this.props;
    this.props.dispatch(changeApp(app));
  }

  componentWillUnmount() {
    this.props.dispatch(changeApp(initialState.app));
  }

  render() {
    const { isMobile, appMeta, appRoutes } = this.props;
    const { name, title, desc } = appMeta;

    return (
      <Wrapper isMobile={isMobile}>
        <Helmet>
          <title>{title}</title>
          <meta name={name} content={desc} />
        </Helmet>
        {
          !isMobile &&
          <AppNav routes={appRoutes} />
        }
      </Wrapper>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  app: PropTypes.object.isRequired,
  isMobile: PropTypes.bool.isRequired,
  appRoutes: PropTypes.array.isRequired,
  appMeta: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isMobile: makeSelectIsMobile(),
  appRoutes: makeSelectAppRoutes(),
  appMeta: makeSelectAppMeta(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(App);
