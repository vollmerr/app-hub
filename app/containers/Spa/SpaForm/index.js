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
    this.initializeForm();
    this.setState({ loading: false }); // eslint-disable-line
  }

  componentWillReceiveProps() {
    this.initializeForm();
  }

  // /**
  //  * Handles submitting the new acknowledgment form to api as ready to be active
  //  */
  // handleSubmitNew = (values) => {
  //   const { onNewAckRequest } = this.props;
  //   onNewAckRequest(values);
  // }

  // items to display in command bar
  getCommands = () => ({
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

  // items to display in command bar for 'draft' status
  getDraftCommands = () => {
    const commands = this.getCommands();
    commands.items.push({
      key: 'back2',
      name: 'Back',
      icon: 'navBack',
      ariaLabel: 'Back to Admin Page',
      onClick: this.handleBack,
    });
    return commands;
  }

  initializeForm = () => {
    const { groups } = this.props;
    // map to { key, text } options as FieldSelect/FieldChecks expects
    const creatorOptions = groups.creatorIds.map((id) => ({
      key: id,
      text: groups.byId[id][C.GROUP.NAME],
    }));
    const targetOptions = groups.targetIds.map((id) => ({
      key: id,
      text: groups.byId[id][C.GROUP.NAME],
    }));
    // set target group options to ones pulled in from API (mapped above)
    const fields = { ...this.state.fields };
    // set options
    fields[C.ACK.CREATOR_GROUP].options = creatorOptions;
    fields[C.ACK.TARGET_GROUPS].options = targetOptions;
    // if single creator group, select it and hide input
    const initialValues = { ...this.props.acknowledgment };
    if (creatorOptions.length === 1) {
      initialValues[C.ACK.CREATOR_GROUP] = creatorOptions[0].key;
      fields[C.ACK.CREATOR_GROUP].hidden = true;
    }
    // set date for tommorrow
    const tommorrow = new Date();
    tommorrow.setDate(tommorrow.getDate() + 1);
    fields[C.ACK.START_DATE].minDate = tommorrow;
    fields[C.ACK.END_DATE].minDate = tommorrow;
    // update fields then show the form
    this.setState({ fields, initialValues });
  }

  /**
   * Handles submitting the new acknowledgment form to api as draft state
   * Does not handle errors, is assumed valid form
   */
  handleSubmitSave = (values) => (event) => {
    event.preventDefault();
    const { onSaveAckRequest } = this.props;
    onSaveAckRequest(values);
  }

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
    console.log('valeus: ', values)
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
    const { loading, initialValues } = this.state;
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
      onSubmit: () => { },
      validate,
      initialValues,
      render: this.renderForm,
    };

    const commandBarProps = {
      setCommandBar,
      commandBar: initialValues[C.ACK.STATUS] === C.STATUS.DRAFT ? this.getDraftCommands() : this.getCommands(),
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


const { object, func } = PropTypes;

SpaForm.propTypes = {
  setCommandBar: func.isRequired,
  acknowledgment: object,
  app: object.isRequired,
  admin: object.isRequired, // eslint-disable-line
  groups: object.isRequired,
  onGetAdminDataRequest: func.isRequired, // eslint-disable-line
  onGetGroupsRequest: func.isRequired, // eslint-disable-line
  // onNewAckRequest: func.isRequired,
  onSaveAckRequest: func.isRequired,
  history: object.isRequired,
  match: object.isRequired,  // eslint-disable-line
};


const mapStateToProps = createStructuredSelector({
  acknowledgment: (state, ownProps) => selectors.getAckById(ownProps.match.params.id)(state, ownProps),
  app: hubSelectors.getApp,
  admin: selectors.getAdmin,
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
