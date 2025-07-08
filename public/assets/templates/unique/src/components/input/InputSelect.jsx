import { Input, Select } from "antd";

export default function InputSelect({
  showSearch,
  label,
  name,
  onChange,
  value,
  placeholder,
  disabled,
  options,
  size,
  labelStyle,
  err,
}) {
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  ///
  return (
    <>
      <div className="label" style={{ ...labelStyle }}>
        {label}
      </div>

      <Select
      auto
        showSearch={showSearch}
        filterOption={filterOption}
        size={size}
        disabled={disabled}
        name={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        className={err && "inputErr"}
        options={options}
        style={{ width: "100%" }}
      />
    </>
  );
}
