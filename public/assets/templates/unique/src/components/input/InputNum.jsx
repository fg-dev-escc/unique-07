import { InputNumber } from "antd";

export const InputNum = ({
  label,
  name,
  onChange,
  value,
  placeholder,
  disabled,
  readOnly,
  size,
  labelStyle,
  style,
  err,
  controls,
  addonBefore,
}) => {
  return (
    <>
      <div className="label" style={{ ...labelStyle }}>
        {label}
      </div>
      <InputNumber
        addonBefore={addonBefore}
        controls={controls}
        style={{ width: "100%", ...style }}
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
};
