import { Col, Row } from "antd";
import { useEffect } from "react";
import logo from '../../assets/Logo.jpg';

export const Resultados = ({ options, onClick, setOptions }) => {
  useEffect(() => {}, [options]);

  if (options.length === 0)
    return (
      <></>
    );

  return (
    <Row className={`contenedorBusqueda`}>
      {options?.length > 0 &&
        options.map((opt) => (
          <Col key={opt.torreID} className="busquedaItem" onClick={()=> onClick(opt)} >
              <img src={logo} style={{ width: 100 }} />
              <span>{opt.nombre}</span>
          </Col>
        ))}
    </Row>
  );
};
