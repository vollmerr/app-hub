import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ErrorMessage from 'components/Loading/ErrorMessage';
import { makeSelectUser, makeSelectApp } from 'containers/AppHub/selectors';

import makeSelectDemoHome, {
  makeSelectExampleData,
} from 'containers/Demo/selectors';
import { exampleDataRequest } from 'containers/Demo/actions';

import Scroll from './Scroll';
import Button from './Button';

export class DemoHome extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isScrolling: false,
    };
  }

  render() {
    const { user, exampleData, onExampleDataRequest, app } = this.props;
    const { isScrolling } = this.state;
    const { error, loading } = app;

    if (error) {
      return <ErrorMessage error={error} to={'/demo'} />;
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

        <Button onClick={() => onExampleDataRequest()} text={'Load Authorized Data'} disabled={loading} />
        {
          exampleData &&
          <p>{JSON.stringify(exampleData)}</p>
        }

        <Button onClick={() => this.setState({ isScrolling: !isScrolling })} text={'Make Window Scroll'} disabled={loading} />
        {
          isScrolling &&
          <Scroll />
        }
      </div>
    );
  }
}

DemoHome.propTypes = {
  onExampleDataRequest: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  exampleData: PropTypes.object,
  app: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  demoHome: makeSelectDemoHome(),
  exampleData: makeSelectExampleData(),
  user: makeSelectUser(),
  app: makeSelectApp(),
});

function mapDispatchToProps(dispatch) {
  return {
    onExampleDataRequest: () => dispatch(exampleDataRequest()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DemoHome);
