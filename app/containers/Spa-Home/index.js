import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectApp } from 'containers/AppHub/selectors';
import ErrorMessage from 'components/Loading/ErrorMessage';
import Content from 'components/App-Content/Content';

export class SpaHome extends React.PureComponent {
  render() {
    const { app } = this.props;
    const { error, loading } = app;

    if (error) {
      return <ErrorMessage error={error} to={'/spa'} />;
    }

    return (
      <Content>
        CONTENT PLACEHOLDER
        {loading && <p>Loading...</p>}
      </Content>
    );
  }
}

SpaHome.propTypes = {
  app: PropTypes.shape({
    error: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
    ]),
    loading: PropTypes.bool,
  }).isRequired,
};

const mapStateToProps = createStructuredSelector({
  app: makeSelectApp(),
});

export default connect(mapStateToProps, {})(SpaHome);
