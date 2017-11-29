import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import appPage from 'containers/App-Container/appPage';
import { makeSelectUser } from 'containers/AppHub/selectors';

import { makeSelectExampleData } from 'containers/Demo/selectors';
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
    const { user, exampleData, onExampleDataRequest } = this.props;
    const { isScrolling } = this.state;

    return (
      <div>
        <p>in demo home......</p>
        <p>Logged in as {user.get('sam')}</p>
        <p>with permissions (BARS):</p>
        <ul>
          {
            user.get('roles').map((role) => <li key={role}>{role}</li>)
          }
        </ul>

        <Button onClick={() => onExampleDataRequest()} text={'Load Authorized Data'} />
        {
          exampleData &&
          <p>{JSON.stringify(exampleData)}</p>
        }

        <Button onClick={() => this.setState({ isScrolling: !isScrolling })} text={'Make Window Scroll'} />
        {
          isScrolling &&
          <Scroll />
        }
      </div>
    );
  }
}


const { func, object } = PropTypes;

DemoHome.propTypes = {
  onExampleDataRequest: func.isRequired,
  user: object.isRequired,
  exampleData: object,
};

const mapStateToProps = createStructuredSelector({
  exampleData: makeSelectExampleData(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    onExampleDataRequest: () => dispatch(exampleDataRequest()),
  };
}

const withAppPage = appPage(DemoHome);

export default connect(mapStateToProps, mapDispatchToProps)(withAppPage);
