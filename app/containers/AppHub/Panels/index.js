import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import toJS from '../../../hocs/toJS';
import Panel from '../../../components/Panel';

import * as selectors from '../selectors';

import panels from './panels';


export class Panels extends React.PureComponent {
  render() {
    const { user, view, panel, onClick } = this.props;
    const Content = panels[panel.name].component;

    const panelProps = {
      onClick,
      isOpen: panel.isOpen,
      isLeft: panels[panel.name].isLeft,
    };

    const contentProps = {
      routes: user.routes,
      isMobile: view.isMobile,
      onClick: () => onClick(null),
    };

    /* istanbul ignore next: TODO: how to test dynamic built components */
    return (
      <Panel {...panelProps}>
        <Content {...contentProps} />
      </Panel>
    );
  }
}


const { func, object } = PropTypes;

Panels.propTypes = {
  user: object.isRequired,
  view: object.isRequired,
  panel: object.isRequired,
  onClick: func.isRequired,
};


const mapStateToProps = createStructuredSelector({
  user: selectors.getUser,
  view: selectors.getView,
  panel: selectors.getViewPanel,
});

const withConnect = connect(mapStateToProps);


export default compose(
  withConnect,
  toJS,
)(Panels);
