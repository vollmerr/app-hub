/**
 *
 * AppHub
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

// import AppHubHeader from 'containers/AppHub-Header';
import AppHubHeader from 'components/AppHub-Header';
import AppHubPanel from 'components/AppHub-Panel';
import theme from 'utils/theme';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectIsMobile, makeSelectPanelIsOpen, makeSelectPanelSelected } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { changeMobile, changePanelOpen, changePanelSelected } from './actions';

export class AppHub extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    const { dispatch, isMobile } = this.props;
    const mobile = window.innerWidth <= theme.breakpoints.md;

    if (mobile !== isMobile) {
      dispatch(changeMobile(mobile));
    }
  }

  handlePanelClick = (panel) => {
    const { dispatch, panelSelected, panelIsOpen } = this.props;
    const selected = panel || panelSelected; // errors if null, so set a default
    // click on same panel or overlay
    if (!panel || (panelSelected === panel && panelIsOpen)) {
      // close it
      dispatch(changePanelOpen(false));
    } else {
      // open the panel (don't dispatch unessecary actions if already open)
      if (!panelIsOpen) {
        dispatch(changePanelOpen(true));
      }
      dispatch(changePanelSelected(selected));
    }
  }

  render() {
    const { isMobile, panelSelected, panelIsOpen } = this.props;

    return (
      <div>
        <AppHubHeader isMobile={isMobile} onClick={this.handlePanelClick} />
        <AppHubPanel panel={panelSelected} isOpen={panelIsOpen} onClick={this.handlePanelClick} />
      </div>
    );
  }
}

AppHub.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  panelIsOpen: PropTypes.bool.isRequired,
  panelSelected: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isMobile: makeSelectIsMobile(),
  panelIsOpen: makeSelectPanelIsOpen(),
  panelSelected: makeSelectPanelSelected(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'appHub', reducer });
const withSaga = injectSaga({ key: 'appHub', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AppHub);
