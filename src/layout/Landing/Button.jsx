import React from 'react'

const Button = ({ onClick, disabled, placeholder }) => (
  <button className="btn btn-secondary" onClick={onClick} disabled={disabled}>
    {placeholder}
  </button>
);

export default Button;