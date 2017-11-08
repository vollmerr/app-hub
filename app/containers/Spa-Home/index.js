import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { CheckboxVisibility } from 'office-ui-fabric-react/lib/DetailsList';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

import theme from 'utils/theme';
import appPage from 'containers/App-Container/appPage';
import { makeSelectPendingAcks } from 'containers/Spa/selectors';
import Section from 'components/App-Content/Section';
import List from 'components/List';


const StyledList = styled(Section)`
  height: calc(50vh - ${theme.hub.headerHeight});
  overflow: hidden;

  .ms-Viewport {
    overflow: auto;
    height: calc(50vh - $ {theme.hub.headerHeight} - ${theme.list.headerHeight} - 15px)
  }

  .ms-DetailsList {
    overflow: visible;
  }

  .ms-DetailsRow-fields,
  .ms-DetailsHeader-cell {
    cursor: pointer;
  }
`;
/* istanbul ignore next: TODO -> write tests for columns onClicks... */
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
    const { pendingAcks } = this.props;

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
      <div>
        <StyledList>
          <List {...pendingAckProps} />
        </StyledList>

        <StyledList>
          <List {...previousAckProps} />
        </StyledList>
      </div>
    );
  }
}


const { shape, arrayOf, string } = PropTypes;

SpaHome.propTypes = {
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
  pendingAcks: makeSelectPendingAcks(),
});

const mapDispatchToProps = {};

const withAppPage = appPage(SpaHome);

export default connect(mapStateToProps, mapDispatchToProps)(withAppPage);
