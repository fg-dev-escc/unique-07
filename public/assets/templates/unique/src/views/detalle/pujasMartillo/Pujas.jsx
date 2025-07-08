import { useSelector } from "react-redux";
import { Col, Row } from "antd";
import { ArrowRightOutlined, UserOutlined } from "@ant-design/icons";
import { formatoMoneda } from "../../../utils/formatoMoneda";
import { crearFecha } from "../../../utils/crearFechaString";

export const Pujas = ({pujas}) => {
  const {user} = useSelector(state => state.userReducer);
  
  if (!pujas || pujas.length === 0) return <p>Sin ofertas</p>
  
  return (
    <>
      {(pujas.length !== 0) &&
        pujas.map((puja, index) => (
          <Row key={`pujaNum_${index}`} justify={"space-around"} style={{marginBottom:10, marginTop:10}}>
            <Col xs={4} sm={4} md={4} lg={5} >
              {user.usuarioID === puja.UsuarioPujaID && (
                <UserOutlined  style={{ color: "orange", fontWeight: 600, fontSize: 14 }}/>
              )}
              {puja.Nickname}
            </Col>
            <Col xs={4} sm={4} md={4} lg={6}>
              { puja.Fecha && crearFecha(puja.Fecha) }
            </Col>
            <Col xs={2} sm={2} md={2} lg={2}>
              <ArrowRightOutlined  style={{ fontWeight: 600, fontSize: 14, color: "orange" }}/>
            </Col>
            <Col xs={4} sm={4} md={4} lg={4} style={{ fontSize: 12, fontWeight: 600 }}>
              <div style={{ textAlign: "right" }}>
                {formatoMoneda(puja.Monto)}
              </div>
            </Col>
          </Row>
        ))
      }
    </>
  )
}
