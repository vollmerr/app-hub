import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import toJS from '../../hocs/toJS';
import withApp from '../../hocs/withApp';
import Router from '../../components/Router';

import { initialState } from '../AppHub/reducer';
import * as selectors from '../AppHub/selectors';
import * as actions from '../AppHub/actions';

import Nav from './Nav';


export class App extends React.PureComponent {
  componentDidMount() {
    const { appProps } = this.props;
    this.props.onChangeApp(appProps);
  }

  componentWillUnmount() {
    this.props.onChangeApp(initialState.app);
  }


  render() {
    const { app } = this.props;

    const routerProps = {
      routes: app.routes,
      error: app.error,
      loading: app.loading,
    };

    return (
      // <Wrapper isMobile={isMobile}>
      //   <Helmet>
      //     <title>{`App Hub | ${appMeta.get('title')}`}</title>
      //     <meta name={'description'} content={appMeta.get('desc')} />
      //     <meta name={'keywords'} content={appMeta.get('keywords')} />
      //   </Helmet>
      //   {
      //     !isMobile &&
      //     <AppNav appRoutes={appRoutes.toJS()} isMobile={isMobile} />
      //   }
      // </Wrapper>
      <div>
        <Nav />
        <Router {...routerProps} />
      </div>
    );
  }
}


const { func, object } = PropTypes;

App.propTypes = {
  app: object.isRequired,
  appProps: object.isRequired,
  onChangeApp: func.isRequired,
};


const mapStateToProps = createStructuredSelector({
  app: selectors.getApp,
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeApp: (app) => dispatch(actions.changeApp(app)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);


export default compose(
  withRouter,
  withConnect,
  withApp,
  toJS,
)(App);
