import { Col, Row } from "antd";
import { Izquierdo } from "./izquierdo/Izquierdo";
import { Derecho } from "./derecho/Derecho";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../../../components/Loading";

export const Contenido = () => {
  const {loading} = useSelector(state => state.subastaReducer);

  if (loading) return <Loading />
  
  return (
    <Row gutter={10}>
      <Col sm={24} md={18}>
        <Izquierdo />
      </Col>
      <Col sm={24} md={6} >
        <Derecho />
      </Col>
    </Row>
  );
};
