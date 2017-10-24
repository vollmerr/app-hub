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

export class AppContainer extends React.PureComponent {
  componentDidMount() {
    const { app } = this.props;
    this.props.onChangeApp(app);
  }

  componentWillUnmount() {
    this.props.onChangeApp(initialState.app);
  }

  render() {
    const { isMobile, appMeta, appRoutes } = this.props;
    const { title, desc, keywords } = appMeta;

    return (
      <Wrapper isMobile={isMobile}>
        <Helmet>
          <title>{`App Hub | ${title}`}</title>
          <meta name={'description'} content={desc} />
          <meta name={'keywords'} content={keywords} />
        </Helmet>
        {
          !isMobile &&
          <AppNav appRoutes={appRoutes} isMobile={isMobile} />
        }
      </Wrapper>
    );
  }
}

AppContainer.propTypes = {
  onChangeApp: PropTypes.func.isRequired,
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

export function mapDispatchToProps(dispatch) {
  return {
    onChangeApp: (app) => dispatch(changeApp(app)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(AppContainer);