import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import toJS from '../../../hocs/toJS';
import Wrapper from '../../../components/Panel';

import * as selectors from '../selectors';

import panels from './panels';


class Panel extends React.PureComponent {
  render() {
    const { app, user, view, panel, onClick } = this.props;
    const Content = panels[panel.name].component;

    const panelProps = {
      onClick,
      isOpen: panel.isOpen,
      isLeft: panels[panel.name].isLeft,
    };

    const contentProps = {
      appRotues: app.routes,
      userRoutes: user.routes,
      isMobile: view.isMobile,
      onClick: () => onClick(null),
    };

    /* istanbul ignore next: TODO: how to test dynamic built components */
    return (
      <Wrapper {...panelProps}>
        <Content {...contentProps} />
      </Wrapper>
    );
  }
}


const { func, object } = PropTypes;

Panel.propTypes = {
  app: object.isRequired,
  user: object.isRequired,
  view: object.isRequired,
  panel: object.isRequired,
  onClick: func.isRequired,
};


const mapStateToProps = createStructuredSelector({
  app: selectors.getApp,
  user: selectors.getUser,
  view: selectors.getView,
  panel: selectors.getViewPanel,
});

const withConnect = connect(mapStateToProps);


export default compose(
  withConnect,
  toJS,
)(Panel);
