import { FilePdfOutlined } from "@ant-design/icons";
import { Col, Divider, Row, Space } from "antd";

export const Documentos = () => {
  const colSize = {
    xs:8,
    sm:8,
    md:8,
    lg:8
  }

  return (
    <div>
      <Divider />
      <div className="subTitulo">Documentos</div>
      <Row gutter={10} justify={"center"} align={"middle"}>
        <Col style={{ textAlign: "center" }} xs={colSize.xs} sm={colSize.sm} md={colSize.md} lg={colSize.lg}>
          <FilePdfOutlined style={{ fontSize: 60, color: "orange" }} />
          <div>Última Tenecia</div>
        </Col>
        <Col style={{ textAlign: "center" }} xs={colSize.xs} sm={colSize.sm} md={colSize.md} lg={colSize.lg}>
          <FilePdfOutlined style={{ fontSize: 60, color: "orange" }} />
          <div>Última Verificación</div>
        </Col>
        <Col style={{ textAlign: "center" }} xs={colSize.xs} sm={colSize.sm} md={colSize.md} lg={colSize.lg}>
          <FilePdfOutlined style={{ fontSize: 60, color: "orange" }} />
          <div>Tarjeta de Circulación</div>
        </Col>
      </Row>
    </div>
  );
};
