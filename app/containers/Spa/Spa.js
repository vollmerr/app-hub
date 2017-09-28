/**
 *
 * Spa
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import AppPanel from 'components/App-Panel/Loadable';
import { changeAppName } from 'containers/AppHub/actions';

import makeSelectSpa from './selectors';
import reducer from './reducer';
import saga from './saga';
import { APP_NAME } from './constants';

export class Spa extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.dispatch(changeAppName(APP_NAME));
  }

  componentWillUnmount() {
    this.props.dispatch(changeAppName(''));
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Spa</title>
          <meta name="description" content="Description of Spa" />
        </Helmet>
        <AppPanel />
        in spa...
      </div>
    );
  }
}

Spa.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  spa: makeSelectSpa(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'spa', reducer });
const withSaga = injectSaga({ key: 'spa', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Spa);
