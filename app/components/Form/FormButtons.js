import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

import theme from 'utils/theme';


export const Buttons = styled.div`
  padding: ${theme.hub.padding}px;
  display: flex;
  justify-content: space-between;
  height: ${theme.form.buttonsHeight}px;
`;

export const Button = styled(DefaultButton)`
  margin-left: ${theme.hub.padding}px;
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
      text: 'Reset',
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
