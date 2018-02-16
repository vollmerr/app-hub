import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Form } from 'react-final-form';

import { Selection } from 'office-ui-fabric-react/lib/DetailsList';

import toJS from '../../../hocs/toJS';
import { shouldFetch } from '../../../utils/api';
import Loading from '../../../components/Loading';
import List, { handleSelectItem } from '../../../components/List';
import { FormSection, FormButtons } from '../../../components/Form';

import * as hubSelectors from '../../AppHub/selectors';

import { adminNoManagerColumns, adminAssignedManagerColumns } from '../data';
import * as selectors from '../selectors';
import * as actions from '../actions';
import * as C from '../constants';
import FieldText from '../../../components/Form/FieldText';
import FieldSelect from '../../../components/Form/FieldSelect';
import theme from '../../../utils/theme';


export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: ${theme.hub.padding / 2}px;
  min-height: calc(
    100vh - \
    ${theme.hub.headerHeight}px
  );
`;
export const FormList = styled(List) `
  box-shadow: none;
  margin: 0;
  padding: 0;
`;


export const Section = styled.div`
  flex: ${(props) => props.flex || 1};
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 300px;
  @media (min-width: ${theme.breakpoints.xs}px) {
    min-width: ${theme.breakpoints.xs - 40}px;
  }
`;

export class PaasAdmin extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      selectedEmployee: { fullName: 'Select Employee From list on left' }, // this will be reportData Item
      selectedInitalAssignedMananger: { fullName: 'Select Employee From list on left' }, // this will be reportData Item
    };
    this.selectionNoManager = new Selection({
      onSelectionChanged: () => handleSelectItem(this, this.selectionNoManager, this.handleSelectNoManager),
    });
    this.selectionAssignedManager = new Selection({
      onSelectionChanged: () => handleSelectItem(this, this.selectionAssignedManager, this.handleSelectAssignedManager),
    });
  }

  async componentDidMount() {
    const { report, onGetReportDataRequest } = this.props;
    if (shouldFetch(report.lastFetched)) {
      await onGetReportDataRequest();
    }

    this.setState({ loading: false }); // eslint-disable-line
  }

  /**
   * Handles selecting an item from a list
   */
  handleSelectNoManager = (item) => {
    console.log('You clicked the nomanageritem...=', item);
    this.setState({ selectedEmployee: item });
  }


  /**
   * Handles selecting an item from a list
   */
  handleSelectAssignedManager = (selectedEmployee) => {
    console.log('You clicked the assigned item...=', selectedEmployee);
    console.log('You clicked the assigned item selectedEmployee[C.AUTH.MANAGER_SID] =', selectedEmployee[C.AUTH.MANAGER_SID]);
    console.log('You clicked the assigned item...all=', this.props.reportData.all);
    const selectedInitalAssignedMananger = this.props.reportData.all.find((e) => e[C.AUTH.SID] === selectedEmployee[C.AUTH.MANAGER_SID]);
    this.setState({ selectedEmployee });
    this.setState({ selectedInitalAssignedMananger });
    console.log('You clicked the assigned item and set State');
  }


  /**
   * Handles submitting a request to the api with form values
   *
   * @param {object} values   - form values
   */
  handleSubmit = async (values) => {
    console.log('SUCCESS.... values=', values);
    // Call new API
  }


  /**
  * Renders the form
  */
  renderForm = ({ handleSubmit, reset, submitting, pristine }) => {
    const { reportData } = this.props;
    const employeeProps = {
      label: 'Employee Name:',
      name: 'employeeName',
      disabled: true,
      placeholder: 'Select employee from list',
    };

    const managerSort = (a, b) => {
      let res = 0;
      const x = a.fullName.toLowerCase();
      const y = b.fullName.toLowerCase();
      if (x > y) {
        res = 1;
      } else {
        res = -1;
      }
      return res;
    };

    // Exclude the employee from the list of managers for selection
    const managerFilter = (e) => {
      const x = this.state.selectedEmployee[C.AUTH.ID];
      return e[C.AUTH.ID] !== x;
    };

    console.log('reportData RENDERFORM', reportData);

    const managerProps = {
      label: 'Manager:',
      name: 'manager_id',
      allowFreeform: 0,
      autoComplete: 'on',
      options: reportData.all.sort(managerSort).filter(managerFilter).map((entry) => (
        {
          key: entry[C.AUTH.ID],
          text: entry.fullName,
        })),
      placeholder: 'Select manager from list',
    };


    const buttonProps = {
      reset,
      disabled: pristine || submitting,
    };

    return (
      <FormSection onSubmit={handleSubmit}>
        <div>Select Employee From Left</div>
        <FieldText {...employeeProps} />
        <FieldSelect {...managerProps} />
        <FormButtons {...buttonProps} />
      </FormSection>
    );
  }

  render() {
    const { app, reportData } = this.props;
    const { loading } = this.state;

    console.log('RenderState =', this.state);

    if (app.loading || app.error || loading) {
      const loadingProps = {
        loading: app.loading || loading,
        error: app.error,
        to: '/',
      };
      return <Loading {...loadingProps} />;
    }

    const listNoManProps = {
      columns: adminNoManagerColumns,
      items: reportData[C.REPORT.NO_MANAGER],
      title: 'Employees w/o Manager',
      sortBy: [C.AUTH.FULL_NAME],
      selection: this.selectionNoManager,
    };

    const listAssignedManProps = {
      columns: adminAssignedManagerColumns,
      items: reportData[C.REPORT.ASSIGNED_MANAGER],
      title: 'Emp. w/assigned Manager',
      sortBy: [C.AUTH.FULL_NAME],
      selection: this.selectionAssignedManager,
    };

    const formProps = {
      initialValues: {
        employeeName: this.state.selectedEmployee[C.AUTH.FULL_NAME],
        employee_id: this.state.selectedEmployee[C.AUTH.ID],
        manager_id: this.state.selectedInitalAssignedMananger[C.AUTH.ID],
      },
      render: this.renderForm,
      onSubmit: this.handleSubmit,
      subscription: { submitting: true, pristine: true },
    };


    return (
      <Wrapper>
        <Section>
          <List {...listNoManProps} />
          <List {...listAssignedManProps} />
        </Section>
        <Section flex={50}>
          <Form {...formProps} />
        </Section>
      </Wrapper>
    );
  }
}


const { object, func } = PropTypes;

PaasAdmin.propTypes = {
  app: object.isRequired,
  report: object.isRequired, // eslint-disable-line
  reportData: object,
  onGetReportDataRequest: func.isRequired, // eslint-disable-line
  onUpdateUsersRequest: func.isRequired,  // eslint-disable-line
};


const mapStateToProps = createStructuredSelector({
  app: hubSelectors.getApp,
  report: selectors.getReport,
  reportData: selectors.getReportData,
});

export const mapDispatchToProps = (dispatch) => ({
  onGetReportDataRequest: () => dispatch(actions.getReportDataRequest()),
  onUpdateUsersRequest: (users) => dispatch(actions.updateUsersRequest(users)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);


export default compose(
  withConnect,
  toJS,
)(PaasAdmin);
