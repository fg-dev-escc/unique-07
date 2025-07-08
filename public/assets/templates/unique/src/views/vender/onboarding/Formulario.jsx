import { Col, Row } from "antd";
import { FormDatos } from "./formDatos/FormDatos";


export const Formulario = () => {

  return (
    <Row className="contenedorOnBoarding" justify={'center'}>
      <Col span={24}>
        <span>Vender Autos</span>
      </Col>
      <Col span={24}>
        <FormDatos />
      </Col>
    </Row>
  );
};
