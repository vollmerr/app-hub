import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Form } from 'react-final-form';
import sortBy from 'lodash/sortBy';

import { Selection } from 'office-ui-fabric-react/lib/DetailsList';

import validate from './validate';
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


const style = {
  count: 2,
  padding: theme.hub.padding,
};


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


export const StyledList = styled(List) `
  margin: ${theme.hub.padding / 2}px;
`;


export const StyledForm = styled(FormSection) `
  margin: ${theme.hub.padding / 2}px;
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
      employee: { [C.AUTH.FULL_NAME]: 'Select an Employee' },
      manager: {},
    };
    this.selectionNoManager = new Selection({
      onSelectionChanged: () => handleSelectItem(this, this.selectionNoManager, this.handleSelectItem),
    });
    this.selectionAssignedManager = new Selection({
      onSelectionChanged: () => handleSelectItem(this, this.selectionAssignedManager, this.handleSelectItem),
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
   * Builds the list of managers to select from
   */
  getManagerOptions = () => {
    const { reportData } = this.props;
    const { employee } = this.state;

    const sortedAuths = sortBy(reportData.all, C.AUTH.FULL_NAME)
      .filter((auth) => (
        employee[C.AUTH.ID] !== auth[C.AUTH.ID]
      ))
      .map((auth) => ({
        key: auth[C.AUTH.ID],
        text: auth[C.AUTH.FULL_NAME],
      }));

    const blank = {
      key: '',
      text: '',
    };
    // add blank option as first
    sortedAuths.unshift(blank);

    return sortedAuths;
  }


  /**
   * Handles selecting an item from a list
   *
   * @param {object} employee   - employee selected from list
   */
  handleSelectItem = (employee) => {
    const { reportData } = this.props;
    const employeesManager = reportData.all.find((e) => e[C.AUTH.SID] === employee[C.AUTH.MANAGER_SID]);
    const manager = employeesManager || { [C.AUTH.FULL_NAME]: '' };
    this.setState({ employee });
    this.setState({ manager });
  }


  /**
   * Handles submitting a request to the api with form values
   *
   * @param {object} values   - form values
   */
  handleSubmit = async (values) => {
    const { reportData, onUpdateUserManagerRequest } = this.props;

    const manager = reportData.all
      .find((e) => e[C.AUTH.ID] === values[C.MANAGE.MANAGER_ID]);
    const user = {
      [C.MANAGE.EMPLOYEE_ID]: values[C.MANAGE.EMPLOYEE_ID],
      [C.MANAGE.MANAGER_ID]: values[C.MANAGE.MANAGER_ID],
      manager: reportData.all.find((e) => e[C.AUTH.ID] === values[C.MANAGE.MANAGER_ID]),
      employee: reportData.all.find((e) => e[C.AUTH.ID] === values[C.MANAGE.EMPLOYEE_ID]),
    };

    await onUpdateUserManagerRequest(user);
    this.setState({ manager });
  }


  /**
   * Renders the form, all parameters are generated from react-final-form
   */
  renderForm = ({ handleSubmit, reset, submitting, pristine }) => {
    const { employee } = this.state;

    const employeeProps = {
      label: 'Employee Name',
      name: 'employeeName',
      disabled: true,
    };

    const managerProps = {
      label: 'Manager',
      name: 'manager_id',
      required: true,
      allowFreeform: 0,
      autoComplete: 'on',
      disabled: !employee[C.AUTH.ID],
      options: this.getManagerOptions(),
    };

    const buttonProps = {
      reset,
      disabled: pristine || submitting,
    };

    return (
      <StyledForm onSubmit={handleSubmit}>
        <h3>Update Manager</h3>
        <FieldText {...employeeProps} />
        <FieldSelect {...managerProps} />
        <FormButtons {...buttonProps} />
      </StyledForm>
    );
  }

  render() {
    const { app, reportData } = this.props;
    const { loading, employee, manager } = this.state;

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
      title: 'No Manager',
      style,
      sortBy: [C.AUTH.FULL_NAME],
      selection: this.selectionNoManager,
    };

    const listAssignedManProps = {
      columns: adminAssignedManagerColumns,
      items: reportData[C.STATUS.ASSIGNED_MANAGER],
      style,
      title: 'Assigned Manager',
      sortBy: [C.AUTH.FULL_NAME],
      selection: this.selectionAssignedManager,
    };

    const formProps = {
      initialValues: {
        employeeName: employee[C.AUTH.FULL_NAME],
        employee_id: employee[C.AUTH.ID],
        manager_id: manager[C.AUTH.ID],
      },
      validate,
      render: this.renderForm,
      onSubmit: this.handleSubmit,
      subscription: { submitting: true, pristine: true },
    };

    return (
      <Wrapper>
        <Section flex={2}>
          <StyledList {...listNoManProps} />
          <StyledList {...listAssignedManProps} />
        </Section>
        <Section>
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
  onUpdateUserManagerRequest: func.isRequired,  // eslint-disable-line
};


const mapStateToProps = createStructuredSelector({
  app: hubSelectors.getApp,
  report: selectors.getReport,
  reportData: selectors.getReportData,
});

export const mapDispatchToProps = (dispatch) => ({
  onGetReportDataRequest: () => dispatch(actions.getReportDataRequest()),
  onUpdateUserManagerRequest: (user) => dispatch(actions.updateUserManagerRequest(user)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);


export default compose(
  withConnect,
  toJS,
)(PaasAdmin);
