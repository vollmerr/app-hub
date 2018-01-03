import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';


export const Buttons = styled.div`
  padding-top: 15px;
  display: flex;
  justify-content: space-between;
`;

export const Button = styled(DefaultButton)`
  margin-left: 10px;
`;


export class FormButtons extends React.Component {
  render() {
    const { disabled, reset, children } = this.props;

    const submitProps = {
      disabled,
      primary: true,
      text: 'Submit',
      type: 'submit',
    };

    const clearProps = {
      disabled,
      text: 'Clear',
      onClick: reset,
    };

    return (
      <Buttons>
        <div>
          {children}
        </div>
        <div>
          <Button {...submitProps} />
          <Button {...clearProps} />
        </div>
      </Buttons>
    );
  }
}


const { bool, node, func } = PropTypes;

FormButtons.propTypes = {
  disabled: bool,
  reset: func.isRequired,
  children: node,
};

export default FormButtons;
