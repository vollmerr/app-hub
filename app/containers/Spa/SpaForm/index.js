import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';
import { Form } from 'react-final-form';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

import toJS from '../../../hocs/toJS';
import { FormSection, FormButtons } from '../../../components/Form';
import theme from '../../../utils/theme';
import Loading from '../../../components/Loading';
import { shouldFetch } from '../../../utils/api';

import LoadCommandBar from '../../App/LoadCommandBar';
import * as hubSelectors from '../../AppHub/selectors';

import { acknowledgment, formFields } from '../data';
import * as selectors from '../selectors';
import * as actions from '../actions';
import * as C from '../constants';

import validate from './validate';


export const Title = styled.h3`
  margin: 0;
`;


export const Fields = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: ${theme.hub.padding}px -${theme.hub.padding}px 0 0;
`;


export const FieldSection = styled.div`
  flex: 100%;
  padding-right: ${theme.hub.padding}px;
  @media (min-width: ${theme.breakpoints.md}px) {
    flex: 50%;
  }
`;


function mapSection(section) {
  return (
    <FieldSection>
      {
        section.map((name) => {
          const { component: Comp, ...props } = acknowledgment[name];

          return (
            <Comp {...props} key={name} />
          );
        })
      }
    </FieldSection>
  );
}


const style = {
  padding: theme.hub.padding + theme.app.commandBarHeight,
};




// import NewAckForm from './NewAckForm';


// import PropTypes from 'prop-types';
// import styled from 'styled-components';
// import { compose } from 'redux';
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router';
// import { createStructuredSelector } from 'reselect';
// import { SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
// import json2csv from 'json2csv';

// import toJS from '../../../hocs/toJS';
// import Loading from '../../../components/Loading';
// import { downloadFile, formatList } from '../../../utils/data';
// import { formattedDate } from '../../../utils/date';
// import { shouldFetch } from '../../../utils/api';
// import List from '../../../components/List';
// import theme from '../../../utils/theme';

// import LoadCommandBar from '../../App/LoadCommandBar';
// import * as hubSelectors from '../../AppHub/selectors';

// import { reportColumns, adminCsv, recipient } from '../data';
// import * as selectors from '../selectors';
// import * as actions from '../actions';
// import * as C from '../constants';

// import PieChart from './PieChart';
// import Details from './Details';
// import DisableModal from './DisableModal';
// import EmailModal from './EmailModal';


// export const Wrapper = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   width: 100%;
//   padding: ${theme.hub.padding / 2}px;
//   min-height: calc(
//     100vh - \
//     ${theme.hub.headerHeight}px - \
//     ${theme.app.commandBarHeight}px
//   );
// `;


// export const Section = styled.div`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   min-height: 250px;

//   @media (min-width: ${theme.breakpoints.sm}px) {
//     min-width: ${theme.breakpoints.sm - 40}px;
//   }
// `;


// export const RecipientList = styled(List) `
//   margin: ${theme.hub.padding / 2}px;
// `;


// const titles = {
//   [C.REPORT.PENDING]: 'Pending Recipients',
//   [C.REPORT.PREVIOUS]: 'Acknowledged Recipients',
// };

// const modal = {
//   email: 'email',
//   disable: 'disable',
// };


export class SpaForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      fields: acknowledgment,
      initialValues: {},
    };
  }

  // TODO: fetch groups if shouldFetch
  // TODO: use id param to determine if new (sdee SPA report)
  async componentDidMount() {
    const { admin, onGetAdminDataRequest, onGetGroupsRequest } = this.props;
    // only load admin data if, not cached
    if (shouldFetch(admin.lastFetched)) {
      await Promise.all([
        onGetAdminDataRequest(),
        onGetGroupsRequest(),
      ]);
    }
    this.setState({ loading: false }); // eslint-disable-line
  }

  // TODO: make initalize form function absed off this...
  // handleShowNew = async () => {
  //   const { groups } = this.props;
  //   // map to { key, text } options as FieldSelect/FieldChecks expects
  //   const creatorOptions = groups.creatorIds.map((id) => ({
  //     key: id,
  //     text: groups.byId[id][C.GROUP.NAME],
  //   }));
  //   const targetOptions = groups.targetIds.map((id) => ({
  //     key: id,
  //     text: groups.byId[id][C.GROUP.NAME],
  //   }));
  //   // set target group options to ones pulled in from API (mapped above)
  //   const fields = { ...this.state.fields };
  //   // set options
  //   fields[C.ACK.CREATOR_GROUP].options = creatorOptions;
  //   fields[C.ACK.TARGET_GROUPS].options = targetOptions;
  //   // if single creator group, select it and hide input
  //   const initialValues = { ...this.state.initalValues };
  //   if (creatorOptions.length === 1) {
  //     initialValues[C.ACK.CREATOR_GROUP] = creatorOptions[0].key;
  //     fields[C.ACK.CREATOR_GROUP].hidden = true;
  //   }
  //   // set date for tommorrow
  //   const tommorrow = new Date();
  //   tommorrow.setDate(tommorrow.getDate() + 1);
  //   fields[C.ACK.START_DATE].minDate = tommorrow;
  //   fields[C.ACK.END_DATE].minDate = tommorrow;
  //   // update fields then show the form
  //   await this.setState({ fields, initialValues });
  //   this.setState({ hideNewAck: false });
  // }

  // /**
  //  * Handles submitting the new acknowledgment form to api as ready to be active
  //  */
  // handleSubmitNew = (values) => {
  //   const { onNewAckRequest } = this.props;
  //   onNewAckRequest(values);
  // }

  // /**
  //  * Handles submitting the new acknowledgment form to api as draft state
  //  * Does not handle errors, is assumed valid form
  //  */
  // handleSubmitSave = (values) => (event) => {
  //   event.preventDefault();
  //   console.log('SAVING : ', values);
  //   const { onSaveAckRequest } = this.props;
  //   onSaveAckRequest(values);
  // }

  // items to display in command bar on new acknowledgment form
  getNewCommands = () => ({
    items: [
      {
        key: 'back',
        name: 'Back',
        icon: 'navBack',
        ariaLabel: 'Back to Admin Page',
        onClick: this.handleBack,
      },
    ],
  })

  // handles navigating 'back' to the admin page
  handleBack = () => {
    const { history } = this.props;
    history.push('/spa/admin');
  }

  renderForm = (props) => {
    const {
      reset,
      valid,
      values,
      pristine,
      submitting,
      handleSubmit,
    } = props; // provided by react-final-form

    const formProps = {
      onSubmit: handleSubmit,
      ...style,
    };

    const buttonProps = {
      reset,
      disabled: pristine || submitting,
    };

    const saveButtonProps = {
      text: 'Save Draft',
      type: 'submit',
      onClick: valid ? this.handleSubmitSave(values) : handleSubmit,
      disabled: pristine || submitting,
    };

    return (
      <FormSection {...formProps}>
        <Title>{'TODO - TITLE BASED OFF STATUS'}</Title>

        <Fields>
          {mapSection(formFields.left)}
          {mapSection(formFields.right)}
        </Fields>

        <FormButtons {...buttonProps}>
          <DefaultButton {...saveButtonProps} />
        </FormButtons>
      </FormSection>
    );
  }

  render() {
    const { app, setCommandBar } = this.props;
    const { loading } = this.state;
    const isLoading = app.loading || loading;
    // LOADING
    if (isLoading || app.error) {
      const loadingProps = {
        loading: isLoading,
        error: app.error,
        to: app.home.path,
      };
      return <Loading {...loadingProps} />;
    }

    const formProps = {
      onSubmit, // TODO: dynamic submit based off status (same as handleSubmitSave for other fucns?)
      validate,
      initialValues, // TODO: get inital values if id provided in route
      render: this.renderForm,
    };

    const commandBarProps = {
      setCommandBar,
      commandBar: this.getCommands(),
      disabled: isLoading || app.error,
    };

    return (
      <div>
        <Form {...formProps} />
        <LoadCommandBar {...commandBarProps} />
      </div>
    );
  }
}


const { object, func, array } = PropTypes;

SpaForm.propTypes = {
  setCommandBar: func.isRequired,
  app: object.isRequired,
  admin: object.isRequired, // eslint-disable-line
  adminActiveItems: array.isRequired,
  adminPreviousItems: array.isRequired,
  groups: object.isRequired,
  enums: object.isRequired,
  onGetAdminDataRequest: func.isRequired, // eslint-disable-line
  onGetGroupsRequest: func.isRequired, // eslint-disable-line
  onNewAckRequest: func.isRequired,
  onSaveAckRequest: func.isRequired,
  history: object.isRequired,
};


const mapStateToProps = createStructuredSelector({
  app: hubSelectors.getApp,
  admin: selectors.getAdmin,
  adminActiveItems: selectors.geAdminItems('acksActive'),
  adminPreviousItems: selectors.geAdminItems('acksPrevious'),
  groups: selectors.getGroups,
  enums: selectors.getEnums,
});

export const mapDispatchToProps = (dispatch) => ({
  onGetAdminDataRequest: () => dispatch(actions.getAdminDataRequest()),
  onGetGroupsRequest: () => dispatch(actions.getGroupsRequest()),
  onNewAckRequest: (vals) => dispatch(actions.newAckRequest(vals)),
  onSaveAckRequest: (vals) => dispatch(actions.saveAckRequest(vals)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);


export default compose(
  withRouter,
  withConnect,
  toJS,
)(SpaForm);
