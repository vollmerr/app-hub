import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';


export const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
`;


export class EmptyMessage extends React.PureComponent {
  render() {
    const { message, buttonText, onClick } = this.props;

    return (
      <Wrapper>
        <p>{message}</p>
        {
          buttonText &&
            <DefaultButton primary text={buttonText} onClick={onClick} />
        }
      </Wrapper>
    );
  }
}


const { string, func } = PropTypes;

EmptyMessage.propTypes = {
  message: string.isRequired,
  onClick: func,
  buttonText: string,
};

export default EmptyMessage;
