import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "antd";
import { Titulo } from "./titulo/Titulo";
import { ImagenPrincipal } from "./imagenPrincipal/ImagenPrincipal";
import { Fotos } from "./fotos/Fotos";
import { Detalles } from "./detalles/Detalles";
import { startGetSubastaTorre } from "../../store/slices/subastaSlice/thunks";
import { Loading } from "../../components/Loading";
import { useWindowSize } from "../../hooks/useWindowSize";
import { BarraTiempo } from "../../components/barraTiempo/BarraTiempo";
import { PujasMartillo } from "./pujasMartillo/PujasMartillo";

export const Detalle = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { extraSmall, small, medium, large } = useWindowSize();
  const { subastaTorre, imgPrincipal, loading } = useSelector(
    (state) => state.subastaReducer
  );

  useEffect(() => {
    dispatch(startGetSubastaTorre(id));
  }, [id]);

  if (loading) return <Loading />;

  return (
    <>
      <BarraTiempo />
      <div className="contenedorDetalle" style={{ marginTop: 10 }}>
        <Row gutter={10} className="sticky-row" justify={"space-between"}>
          <Col span={24}>
            <Titulo
              titulo={subastaTorre?.nombre}
              compraAhora={subastaTorre?.montoSalida}
            />
          </Col>
        </Row>
        <Row gutter={10}>
          <Col sm={24} md={24} lg={16}>
            <Col>
              <ImagenPrincipal img={imgPrincipal} />
            </Col>
            {(medium || small || extraSmall) && (
              <Row justify={"center"} className="contenedorPujaMartillo">
                <Col span={24}>
                  <PujasMartillo torreID={id} />
                  <Fotos imagenes={subastaTorre?.imagenes} />
                </Col>
              </Row>
            )}
          </Col>
          {
            (large) && (
              <Col sm={24} md={8} lg={8}>
                <PujasMartillo torreID={id} />
                <Fotos imagenes={subastaTorre?.imagenes} />
              </Col>
            )
          }
        </Row>
        <Row>
          <Col>
            <Detalles
              valores={subastaTorre?.valores}
              descripcion={subastaTorre?.descripcion}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};
