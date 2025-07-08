import { SmileOutlined } from "@ant-design/icons";

export const MensajeSesion = ({ texto, paddingTop, className }) => {
  return (
    <div style={{ paddingTop, width: "100%" }} className={className}>
      <div
        style={{
          width: "100%",
          height: "100px",
          color: "orange",
          textAlign: "center",
          fontWeight: 600,
          fontSize: "1.1em",
          borderRadius: 10,
          //  border: "1px solid orange",
        }}
      >
        <SmileOutlined style={{ fontSize: "2em" }} />
        <div>{texto}</div>
      </div>
    </div>
  );
};