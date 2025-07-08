import { Input } from "antd";
import React from "react";

export const InputText =({
  label,
  name,
  onChange,
  value,
  placeholder,
  disabled,
  readOnly,
  size,
  labelStyle,
  err,
}) => {
  return (
    <>
      <div className="label" style={{ ...labelStyle }}>
        {label}
      </div>
      <Input
        autoComplete="one-time-code"
        size={size}
        readOnly={readOnly}
        disabled={disabled}
        name={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        className={err && "inputErr"}
      />
    </>
  );
}
