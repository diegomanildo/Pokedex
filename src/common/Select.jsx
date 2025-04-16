import React from "react";

function Select({ value, onChange, options }) {
  return (
    <select value={value} onChange={onChange} className="form-select w-auto">
      {options.map((opt) => (
        <option
          key={opt}
          className="text-capitalize"
          value={opt === options[0] ? "" : opt}
        >
          {opt}
        </option>
      ))}
    </select>
  );
}

export default Select;
