import { DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

export const LabelFile = ({ label, valor, punteado }) => {
  return (
    <>
      <div className="label">
        <span style={punteado && { borderBottom: "2px dotted orange" }}>
          {label}
        </span>
      </div>
      <div className="valor">
        <Button size="small" type="link">
          <DownloadOutlined /> Descargar
        </Button>
      </div>
    </>
  );
};
