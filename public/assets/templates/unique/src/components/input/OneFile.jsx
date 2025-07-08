import { Button, Col, Row, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import InputText from "./InputText";

export const OneFile = ({
  small,
  body,
  setBody,
  onClick,
  label = "Nombre del Documento",
}) => {
  const props = {
    beforeUpload: (file) => {
      setBody({ ...body, file });
      return false;
    },
    maxCount: 1,
    showUploadList: false,
  };

  return (
    <>
      <Row gutter={10}>
        <Col>
          <InputText
            label={label}
            name="nombre"
            value={body.nombre}
            onChange={({ target }) =>
              setBody({ ...body, nombre: target.value })
            }
          />
        </Col>
        <Col>
          <Upload {...props} style={{ width: "100%" }}>
            <Button
              style={{ textAlign: "left", marginTop: 20 }}
              icon={<UploadOutlined />}
            >
              Seleccione documento
            </Button>
          </Upload>
          <div style={{ marginLeft: 10 }}>
            <small style={{ color: "#ccc" }}>{small}</small>
          </div>
        </Col>
        <Col style={{ paddingTop: 20 }}>
          <Button
            disabled={!body.nombre || !body.file}
            onClick={onClick}
            type="primary"
          >
            Cargar Archivo
          </Button>
        </Col>
      </Row>

      <small style={{ color: "orange", marginLeft: 10 }}>
        {body.file && body.file.name}
      </small>
    </>
  );
};
