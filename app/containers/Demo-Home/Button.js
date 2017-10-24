import React from 'react';

const Button = ({ onClick, disabled, text }) => ( // eslint-disable-line
  <button
    onClick={onClick}
    disabled={disabled}
    style={{ background: disabled ? '#666' : '#333', color: '#fff', padding: '10px 15px', cursor: 'pointer' }}
  >{text}</button>
);

export default Button;
