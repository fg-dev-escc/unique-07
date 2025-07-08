import { Input, Tooltip } from "antd";
import React from "react";

export default function InputPassword({
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
  tooltip,
}) {
  return (
    <>
      <div className={"label"} style={{ ...labelStyle }}>
        <Tooltip title={tooltip}>{label}</Tooltip>
      </div>
      <Input.Password
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
