import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Col, Row } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { genCronometro } from "../../../../utils/crearCronometro";

export const Item = ({ img, titulo, descripcion, torreId, fecha }) => {
  const navigate = useNavigate();
  const [tiempoRestante, setTiempoRestante] = useState(genCronometro(fecha));

  useEffect(() => {
      const intervalo = setInterval(() => {
        const nuevoTiempo = genCronometro(fecha);
        setTiempoRestante(nuevoTiempo);
      }, 1000);
  
      return () => clearInterval(intervalo);
    }, []);

  const handleClick = ()=>{
    navigate(`/detalles/${torreId}`)
  };

  return (
    <div className="Index_ContenedorCard" >
      <div className="Index_TituloCard">{titulo}</div>
        <Row style={{ marginBottom: 10 }}>
          <Col span={6} style={{ color: "orange", fontWeight: 600 }}>
            Tipo subasta: Reservada
          </Col>
          <Col span={12}></Col>
          <Col span={6} style={{ color: "orange", fontWeight: 600 }}>
            3 ofertas, 10 comentarios
          </Col>
        </Row>
        <div style={{textAlign:'center'}}>
          <img className="Index_ImgDetalle" src={img} alt="BMW M3" onClick={handleClick} />
          <Row 
            justify="space-around"
            style={{ width: "90%", position: 'relative', bottom:40, left: 35}}
          >
            <Col sm={8} md={8}>
              <div className="transparentBubble">
                <ClockCircleOutlined /> {tiempoRestante}
              </div>
            </Col>
            <Col sm={7} md={8}>
              <div className="transparentBubble">Oferta Mayor: $850,000</div>
            </Col>
          </Row>
        </div>
      <div className="Index_Descripcion">{descripcion}</div>
    </div>
  );
};