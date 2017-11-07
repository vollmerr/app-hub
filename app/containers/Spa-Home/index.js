import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

import theme from 'utils/theme';
import { makeSelectApp } from 'containers/AppHub/selectors';
import ErrorMessage from 'components/Loading/ErrorMessage';
import Content from 'components/App-Content/Content';
import Section from 'components/App-Content/Section';
import List from 'components/List';

const StyledList = styled(Section)`
  height: calc(50vh - ${theme.hub.headerHeight});
  overflow: hidden;

  .ms-Viewport {
    overflow: auto;
    height: calc(50vh - ${theme.hub.headerHeight} - ${theme.list.headerHeight} - 15px)
  }

  .ms-DetailsList {
    overflow: visible;
  }
`;

const items = [
  {
    name: 'item 1',
    status: 'status 1',
    startDate: '12/12/2100',
    endDate: '12/13/2100',
  },
  {
    name: 'item 2',
    status: 'status 1',
    startDate: '12/12/2100',
    endDate: '12/15/2100',
  },
  {
    name: 'item 3',
    status: 'status 4',
    startDate: '12/12/1900',
    endDate: '12/12/2019',
  },
];

const columns = [
  {
    key: 'name',
    name: 'Name',
    fieldName: 'name',
  },
  {
    key: 'status',
    name: 'Status',
    fieldName: 'status',
  },
  {
    key: 'startDate',
    name: 'Start Date',
    fieldName: 'startDate',
  },
  {
    key: 'endDate',
    name: 'End Date',
    fieldName: 'endDate',
  },
];


export class SpaHome extends React.PureComponent {
  render() {
    const { app } = this.props;
    const { error } = app;

    if (error) {
      return <ErrorMessage error={error} to={'/spa'} />;
    }

    const pendingAckProps = {
      items, // items: items,
      columns,
      title: 'Pending Acknowledgment',
      emptyMessage: 'No Acknowledgments Pending Approval',
    };

    const previousAckProps = {
      items: [],
      columns,
      title: 'Previous Acknowledgments',
      emptyMessage: 'No Previous Acknowledgments',
    };

    return (
      <Content>
        <StyledList>
          <List {...pendingAckProps} />
        </StyledList>

        <StyledList>
          <List {...previousAckProps} />
        </StyledList>
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
