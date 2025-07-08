import { Input } from "antd";
import React from "react";

export default function InputTextarea({
  disabled,
  err,
  label,
  labelStyle,
  name,
  onChange,
  placeholder,
  readOnly,
  size,
  style,
  value,
}) {
  return (
    <>
      <div className="label" style={{ ...labelStyle }}>
        {label}
      </div>
      <Input.TextArea
        autoComplete="one-time-code"
        size={size}
        readOnly={readOnly}
        disabled={disabled}
        name={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        className={err && "inputErr"}
        style={style}
      />
    </>
  );
}
