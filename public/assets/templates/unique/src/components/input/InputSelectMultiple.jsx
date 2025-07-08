import { Select } from "antd";
import React from "react";

export default function InputSelectMultiple({
  label,
  name,
  onChange,
  value,
  placeholder,
  labelStyle,
  err,
  options,
  disabled,
}) {
  return (
    <>
      <div className="label" style={{ ...labelStyle }}>
        {label}
      </div>
      <Select
        disabled={disabled}
        mode="multiple"
        style={{ width: "100%" }}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        options={options}
        value={value}
        className={err && "errInput"}
      />
    </>
  );
}
