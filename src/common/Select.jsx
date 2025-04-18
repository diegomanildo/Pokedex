import React from "react";

function Select({ value, onChange, options }) {
  return (
    <select className="form-select w-auto" value={value} onChange={onChange}>
      {options.map((opt) => {
        const isString = typeof opt === "string";
        const optionValue = isString ? (opt === options[0] ? "" : opt) : opt.value;
        const optionLabel = isString ? opt : opt.label;

        return (
          <option
            key={optionValue}
            className="text-capitalize"
            value={optionValue}
          >
            {optionLabel}
          </option>
        );
      })}
    </select>
  );
}

export default Select;
