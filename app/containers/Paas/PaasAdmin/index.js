import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Form } from 'react-final-form';

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
      selectedEmployee: { [C.AUTH.FULL_NAME]: 'Select Employee From list on left' }, // this will be reportData Item
      selectedInitalAssignedMananger: { [C.AUTH.FULL_NAME]: 'Select Employee From list on left' }, // this will be reportData Item
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

  getManagerOptions = () => {
    const { reportData } = this.props;
    // Exclude the employee from the list of managers for selection
    const managerFilter = (e) => {
      const x = this.state.selectedEmployee[C.AUTH.ID];
      return e[C.AUTH.ID] !== x;
    };
    // sort the manager list alphabetically
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

    const ret = reportData.all.sort(managerSort).filter(managerFilter).map((entry) => (
      {
        key: entry[C.AUTH.ID],
        text: entry[C.AUTH.FULL_NAME],
      }));
    const blank = {
      key: '',
      text: '',
    };
    ret.unshift(blank);

    return ret;
  }

  /**
   * Handles selecting an item from a list
   */
  handleSelectNoManager = (item) => {
    const selectedInitalAssignedMananger = {
      [C.AUTH.FULL_NAME]: '',
    };
    this.setState({ selectedEmployee: item });
    this.setState({ selectedInitalAssignedMananger });
  }


  /**
   * Handles selecting an item from a list
   */
  handleSelectAssignedManager = (selectedEmployee) => {
    const selectedInitalAssignedMananger = this.props.reportData.all.find((e) => e[C.AUTH.SID] === selectedEmployee[C.AUTH.MANAGER_SID]);
    this.setState({ selectedEmployee });
    this.setState({ selectedInitalAssignedMananger });
  }


  /**
   * Handles submitting a request to the api with form values
   *
   * @param {object} values   - form values
   */
  handleSubmit = async (values) => {
    const selectedInitalAssignedMananger = this.props.reportData.all
      .find((e) => e[C.AUTH.ID] === values[C.MANAGE.MANAGER_ID]);
    const { onUpdateUserManagerRequest } = this.props;
    const user = {
      [C.MANAGE.EMPLOYEE_ID]: values[C.MANAGE.EMPLOYEE_ID],
      [C.MANAGE.MANAGER_ID]: values[C.MANAGE.MANAGER_ID],
      manager: this.props.reportData.all.find((e) => e[C.AUTH.ID] === values[C.MANAGE.MANAGER_ID]),
      employee: this.props.reportData.all.find((e) => e[C.AUTH.ID] === values[C.MANAGE.EMPLOYEE_ID]),
    };

    await onUpdateUserManagerRequest(user);
    this.setState({ selectedInitalAssignedMananger });
  }

    /**
  * Renders the form
  */
  renderForm = ({ handleSubmit, reset, submitting, pristine }) => {
    const employeeProps = {
      label: 'Employee Name:',
      name: 'employeeName',
      disabled: true,
      placeholder: 'Select employee from list',
    };

    const disableManagerDropdown =
      this.state.selectedEmployee[C.AUTH.ID] === undefined;

    const managerProps = {
      label: 'Manager:',
      name: 'manager_id',
      allowFreeform: 0,
      autoComplete: 'on',
      disabled: disableManagerDropdown,
      options: this.getManagerOptions(),
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
      style,
      sortBy: [C.AUTH.FULL_NAME],
      selection: this.selectionNoManager,
    };

    const listAssignedManProps = {
      columns: adminAssignedManagerColumns,
      items: reportData[C.STATUS.ASSIGNED_MANAGER],
      style,
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
      validate,
      render: this.renderForm,
      onSubmit: this.handleSubmit,
      subscription: { submitting: true, pristine: true },
    };


    return (
      <Wrapper>
        <Section flex={5}>
          <List {...listNoManProps} />
          <List {...listAssignedManProps} />
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
