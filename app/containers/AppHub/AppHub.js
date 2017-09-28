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
import Panel from 'components/Panel';
import theme from 'utils/theme';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectIsMobile } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { changeMobile } from './actions';

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

  render() {
    const { isMobile } = this.props;

    return (
      <div>
        <AppHubHeader isMobile={isMobile} onClick={() => alert('clicked header')} />
        <Panel isOpen onClick={(e) => alert(e.target.id)}>
          <div>
            <div id={'1'}>ONE</div>
            <div id={'2'}>TWO</div>
          </div>
        </Panel>
      </div>
    );
  }
}

AppHub.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isMobile: makeSelectIsMobile(),
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
