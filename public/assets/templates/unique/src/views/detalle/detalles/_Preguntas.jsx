import { Col, Divider, Row } from "antd";

export const Preguntas = ({valores}) => {

  return (
    <div>
      <div className="subTitulo"> Detalles del Vehículo</div>
      <Divider />

      <Row >
        {valores?.map((valor) => (
          <Col span={12} className="Preguntas" key={valor.campo}>
            <b>{valor.campo}: </b>{valor.valor}
          </Col>
        ))}
        
      </Row>
    </div>
  );
};
