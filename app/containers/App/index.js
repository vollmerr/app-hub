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

import { changeApp } from 'containers/AppHub/actions';
import AppNav from 'components/App-Nav';

export class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const { route: { name, path } } = this.props;
    this.props.dispatch(changeApp({ name, path }));
  }

  componentWillUnmount() {
    this.props.dispatch(changeApp({ name: '', path: '' }));
  }

  render() {
    const { children, meta: { name, title, desc } } = this.props;

    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name={name} content={desc} />
        </Helmet>
        <AppNav />
        {children}
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  route: PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
  meta: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(App);
