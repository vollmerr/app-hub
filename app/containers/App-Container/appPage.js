import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { appProp } from 'utils/propTypes';
import ErrorMessage from 'components/Loading/ErrorMessage';
import LoadingMessage from 'components/Loading/LoadingMessage';
import Content from 'components/App-Content/Content';
import { makeSelectApp } from 'containers/AppHub/selectors';


export function appPage(Component) {
  return class extends React.PureComponent {
    static displayName = Component.displayName ||
      Component.name /* istanbul ignore next: can't set `name` for testing as read only */ ||
      'AppPage';
    static propTypes = {
      app: appProp.isRequired,
    };

    render() {
      const { app } = this.props;
      const { error, loading, routes } = app;
      const to = routes && routes[0] ? routes[0].path : '/';

      if (error) {
        return <ErrorMessage error={error} to={to} />;
      } else if (loading) {
        return <LoadingMessage />;
      }

      return <Content><Component {...this.props} /></Content>;
    }
  };
}

const mapStateToProps = createStructuredSelector({
  app: makeSelectApp(),
});

export default (Component) => connect(mapStateToProps, {})(appPage(Component));
