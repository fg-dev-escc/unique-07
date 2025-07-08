import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Col, Row } from "antd";

export const FotoGrid = () => {
  const navigate = useNavigate();
  const {gridCars} = useSelector((state) => state.slideshowReducer);
  const tamRes = {
    xs:8,
    sm: 4,
    md: 12,
    lg:12,
    xl: 8
  };
  
  const handleClick = (car) => {
    navigate(`/detalles/${car.link}`);
  };

  return (
    <Row gutter={[1, 1]} >
      {
        gridCars.length === 0 
        ? ( <Col span={24} className="loading">
            Sin imagenes para mostrar
          </Col>) 
        : gridCars.map((car, index) => {
          return (
            <Col key={car.id} xs={tamRes.xs} sm={tamRes.sm} md={tamRes.md} xl={tamRes.xl}>
                <img src={car.url} className="imgGrid" alt={car.altText} onClick={()=> handleClick(car)}/>
            </Col>
          );
        })
      }
    </Row>
  );
};
