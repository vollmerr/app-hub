import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Form } from 'react-final-form';

import appPage from 'containers/App-Container/appPage';
import theme from 'utils/theme';

import Section from './Section';
import fields from './data';
import validate from './validate';


const StyledForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: 15px 0;
`;


const Buttons = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 5px;
  padding: 25px;
  background: ${theme.white};

  * {
    transition: none;
  }
`;


export class DemoForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { Loading } = this.props;
    const onSubmit = (vals) => alert(JSON.stringify(vals, null, 2));

    if (Loading) {
      return Loading;
    }

    return (
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, reset, submitting, pristine }) => (
          <StyledForm onSubmit={handleSubmit}>
            {
              fields.allSections.map((sectionName) => (
                <Section key={sectionName} {...fields.bySection[sectionName]} />
              ))
            }

            <Buttons>
              <DefaultButton
                primary
                type={'submit'}
                disabled={pristine || submitting}
                text={'Submit'}
              />
              <DefaultButton
                disabled={pristine || submitting}
                text={'Clear'}
                onClick={reset}
              />
            </Buttons>
          </StyledForm>
        )}
      />
    );
  }
}


const { node } = PropTypes;

DemoForm.propTypes = {
  Loading: node,
};

export default appPage(DemoForm);
