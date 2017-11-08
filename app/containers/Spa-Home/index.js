import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { CheckboxVisibility } from 'office-ui-fabric-react/lib/DetailsList';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

import theme from 'utils/theme';
import { makeSelectApp } from 'containers/AppHub/selectors';
import { makeSelectPendingAcks } from 'containers/Spa/selectors';
import ErrorMessage from 'components/Loading/ErrorMessage';
import LoadingMessage from 'components/Loading/LoadingMessage';
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

  .ms-DetailsRow-fields,
  .ms-DetailsHeader-cell {
    cursor: pointer;
  }
`;

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
  {
    key: 'readButton',
    name: 'readButton',
    fieldName: 'readButton',
    isIconOnly: true,
    notSortable: true,
    onRender: () => (
      <DefaultButton primary onClick={() => alert('clickkk')} text={'Read'} />
    ),
  },
  {
    key: 'ackButton',
    name: 'ackButton',
    fieldName: 'ackButton',
    isIconOnly: true,
    notSortable: true,
    onRender: () => (
      <DefaultButton disabled={false} primary onClick={() => alert('clickkk')} text={'Acknowledge'} />
    ),
  },
];


export class SpaHome extends React.PureComponent {
  render() {
    const { app, pendingAcks } = this.props;
    const { error, loading } = app;

    if (error) {
      return <ErrorMessage error={error} to={'/spa'} />;
    }

    if (loading) {
      return <LoadingMessage />;
    }

    const pendingAckProps = {
      items: pendingAcks,
      columns,
      title: 'Pending Acknowledgment',
      emptyMessage: 'No Acknowledgments Pending Approval',
      checkboxVisibility: CheckboxVisibility.hidden,
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


const { shape, arrayOf, oneOfType, object, string, bool } = PropTypes;

SpaHome.propTypes = {
  app: shape({
    error: oneOfType([
      object,
      string,
    ]),
    loading: bool,
  }).isRequired,
  pendingAcks: arrayOf(
    shape({
      name: string,
      status: string,
      startDate: string,
      endDate: string,
      dateRead: string,
    }),
  ),
};

const mapStateToProps = createStructuredSelector({
  app: makeSelectApp(),
  pendingAcks: makeSelectPendingAcks(),
});

export default connect(mapStateToProps, {})(SpaHome);
