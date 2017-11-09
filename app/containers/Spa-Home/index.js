import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { CheckboxVisibility, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';

import theme from 'utils/theme';
import appPage from 'containers/App-Container/appPage';
import { makeSelectPendingAcks } from 'containers/Spa/selectors';
import Section from 'components/App-Content/Section';
import List from 'components/List';

import AckModal from './AckModal';

const StyledList = styled(Section) `
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
];

// const normalizeById = (arr, key = 'id') => {
//   const allIds = arr.reduce((acc, cur) => {
//     acc[cur[key]] = cur;
//     return acc;
//   }, {});
//   const byId = Object.keys(allIds);
//   return { allIds, byId };
// };


export class SpaHome extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hasRead: false,
      hideModal: true,
      selectedItem: {},
      // pendingColumns: [...testColumns, this.readButtonColumn(), this.ackButtonColumn()],
      // previousColumns: [...testColumns, this.readButtonColumn()],
    };
  }

  // readButtonColumn = () => ({
  //   key: 'readButton',
  //   name: 'readButton',
  //   fieldName: 'readButton',
  //   isIconOnly: true,
  //   notSortable: true,
  //   onRender: ({ id }) => (
  //     <DefaultButton primary onClick={this.props.onStartAssignment(id)} text={'(I) Read'} />
  //   ),
  // });

  // ackButtonColumn = () => ({
  //   key: 'ackButton',
  //   name: 'ackButton',
  //   fieldName: 'ackButton',
  //   isIconOnly: true,
  //   notSortable: true,
  //   onRender: ({ isRead, id }) => (
  //     <DefaultButton disabled={!isRead} primary onClick={this.props.onFinishAssignment(id)} text={'(I) Acknowledge'} />
  //   ),
  // });

  handleRead = () => {
    this.setState({
      hasRead: true,
    });
  }

  handleAck = () => {
    alert('doing API stuffs...');
    this.handleCloseModal();
  }

  handleOpenModal = (item) => {
    this.setState({
      hideModal: false,
      selectedItem: item,
    });
  }

  handleCloseModal = () => {
    this.setState({
      hasRead: false,
      hideModal: true,
    });
  }

  render() {
    const { pendingAcks } = this.props;
    // const { pendingColumns, previousColumns } = this.state;
    const { selectedItem, hasRead, hideModal } = this.state;

    const pendingAckProps = {
      items: pendingAcks,
      columns,
      title: 'Pending Acknowledgment',
      emptyMessage: 'No Acknowledgments Pending Approval',
      selectionMode: SelectionMode.none,
      onActiveItemChanged: this.handleOpenModal,
    };

    const previousAckProps = {
      items: [],
      columns,
      title: 'Previous Acknowledgments',
      emptyMessage: 'No Previous Acknowledgments',
    };

    const modalProps = {
      hasRead,
      hideModal,
      item: selectedItem,
      onClose: this.handleCloseModal,
      onRead: this.handleRead,
      onAck: this.handleAck,
    };

    return (
      <div>
        <StyledList>
          <List {...pendingAckProps} />
        </StyledList>

        <StyledList>
          <List {...previousAckProps} />
        </StyledList>

        <AckModal {...modalProps} />
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

const mapDispatchToProps = (dispatch) => ({
  // onFinishAssignment: (id) => () => dispatch(finishAssignment(id)),
  // onStartAssignment: (id) => () => dispatch(startAssignment(id)),
});

const withAppPage = appPage(SpaHome);

export default connect(mapStateToProps, mapDispatchToProps)(withAppPage);
