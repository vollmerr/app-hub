import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectUser } from 'containers/AppHub/selectors';

import makeSelectDemoHome, {
  makeSelectExampleData,
  makeSelectError,
  makeSelectLoading,
} from './selectors';

import { exampleDataRequest } from './actions';
import reducer from './reducer';
import saga from './saga';

const Button = ({ onClick, disabled, text }) => ( // eslint-disable-line
  <button
    onClick={onClick}
    disabled={disabled}
    style={{ background: disabled ? '#666' : '#333', color: '#fff', padding: '10px 15px', cursor: 'pointer' }}
  >{text}</button>
);

export class DemoHome extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isScrolling: false,
    };
  }


  render() {
    const { user, exampleData, dispatch, error, loading } = this.props;
    const { isScrolling } = this.state;

    if (error) {
      return <p>Placholder for error message</p>;
    }

    return (
      <div>
        <p>in demo home......</p>
        <p>Logged in as {user.sam}</p>
        <p>with permissions (BARS):</p>
        <ul>
          {
            user.roles.map((role) => <li key={role}>{role}</li>)
          }
        </ul>

        <Button onClick={() => dispatch(exampleDataRequest())} text={'Load Authorized Data'} disabled={loading} />
        {
          exampleData &&
          <p>{JSON.stringify(exampleData)}</p>
        }

        <Button onClick={() => this.setState({ isScrolling: !isScrolling })} text={'Make Window Scroll'} disabled={loading} />
        {
          isScrolling &&
          <div><h1>TEST SCROLL</h1><h1>TEST SCROLL</h1><h1>TEST SCROLL</h1><h1>TEST SCROLL</h1><h1>TEST SCROLL</h1><h1>TEST SCROLL</h1><h1>TEST SCROLL</h1><h1>TEST SCROLL</h1><h1>TEST SCROLL</h1><h1>TEST SCROLL</h1><h1>TEST SCROLL</h1><h1>TEST SCROLL</h1><h1>TEST SCROLL</h1><h1>TEST SCROLL</h1><h1>TEST SCROLL</h1><h1>TEST SCROLL</h1><h1>TEST SCROLL</h1><h1>TEST SCROLL</h1><h1>TEST SCROLL</h1><h1>TEST SCROLL</h1><h1>TEST SCROLL</h1><h1>TEST SCROLL</h1><h1>TEST SCROLL</h1></div>
        }
      </div >
    );
  }
}

DemoHome.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  exampleData: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  demoHome: makeSelectDemoHome(),
  exampleData: makeSelectExampleData(),
  user: makeSelectUser(),
  error: makeSelectError(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'demoHome', reducer });
const withSaga = injectSaga({ key: 'demoHome', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(DemoHome);
