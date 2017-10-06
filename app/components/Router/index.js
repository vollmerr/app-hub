import React from 'react';
import PropTypes from 'prop-types';

import { Switch, Route, Redirect } from 'react-router-dom';

const Router = ({ routes }) => (
  <Switch>
    {
      routes.map((route) => (
        <Route exact={route.exact} key={route.key} path={route.path} component={route.component} />
      ))
    }
    <Redirect to={routes[0].path} />
  </Switch>
);

Router.propTypes = {
  routes: PropTypes.array.isRequired,
};

export default Router;
