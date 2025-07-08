import { Col, Row } from "antd";
import { useDispatch } from "react-redux";
import { setImagenPrincipal } from "../../../store/slices/subastaSlice/subastaSlice";

export const Fotos = ({ imagenes }) => {
  const dispatch = useDispatch();
  const setImg = (url)=>{
    dispatch(setImagenPrincipal(url));
  };

  if (!imagenes || imagenes.length === 0) return <div>No hay imágenes disponibles</div>;
  return (
    <Row gutter={[1, 1]} className="imgGridContenedor" wrap justify={'center'}>
      {imagenes.map((imagen) => (
        <Col key={imagen.articuloDocumentoID} xs={4} sm={4} md={3} lg={4} onMouseEnter={()=>setImg(imagen.url)} >
          <img src={imagen.url} className="imgGrid"/  >
        </Col>
      ))}
    </Row>
  );
};
