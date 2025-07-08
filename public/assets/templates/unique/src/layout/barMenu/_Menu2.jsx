import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Col, Input, Row } from "antd";
import { setModalLogin, setModalRegistro, setModalToken} from "../../store/slices/modal/modalSlice";
import { logOut } from "../../store/slices/auth/userSlice";
import { startSetPujaMayor } from "../../store/slices/subastaSlice/thunks";
import { useWindowSize } from "../../hooks/useWindowSize";
import { ModalLogin } from "./modalLogin/ModalLogin";
import { ModalRegistro } from "./modalRegistro/ModalRegistro";
import { ModalToken } from "./modalToken/ModalToken";
import { ResponsiveMenu } from "./responsiveMenu/ResponsiveMenu";
import { Busqueda } from "../../components/Busqueda/Busqueda";

export const Menu2 = ({isSticky}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, logged } = useSelector(state => state.userReducer);
  const { extraSmall ,small } = useWindowSize();

  const handleModalLogin = () => {
    dispatch(setModalLogin(true));
  };

  const handleLogOut = () => {
    dispatch(logOut());
    dispatch(startSetPujaMayor(0, null));
    navigate("/");
  };

  const handleModalRegistro = () => {
    dispatch(setModalRegistro(true));
  };

  const handleModalToken = () => {
    dispatch(setModalToken(true));
  };

  return (
    <>
      {(small || extraSmall )? (
        <ResponsiveMenu isSticky={isSticky}/>
      ) : (
       <Row justify="space-between" gutter={1} style={{ width: "100%", padding:'0 10px'}}>
          <Row gutter={10}>
            <Col onClick={() => navigate("/")}>
              <div className="MenuItem" >
                Inicio
              </div>
            </Col >
            <Col onClick={()=> navigate('/vender')} >
              <div className="MenuItem">Vender</div>
            </Col>
            <Col >
              <div className="MenuItem">Nosotros</div>
            </Col>
            <Col >
              <div className="MenuItem">Contacto</div>
            </Col>
          </Row>
          <Row justify="space-between" gutter={1}>
            <Busqueda />
            <Col>
              {logged === "logged" ? (
                <div className="MenuItem">{user.nombre}</div>
              ) : (
                <div className="MenuItem" onClick={handleModalLogin}>
                  Login
                </div>
              )}
              <ModalLogin />
            </Col>
            <Col>
              {logged === "logged" ? (
                <div className="MenuItem" onClick={handleLogOut}>
                  Cerrar sesión
                </div>
              ) : (
                <div className="MenuItem" onClick={handleModalRegistro}>
                  Registro
                </div>
              )}
              <ModalRegistro />
            </Col>
            <Col>
              {(logged === "logged") && 
                (
                  <div className="MenuItem" onClick={handleModalToken}>
                    Tokens 0
                  </div>
                )
              }
              <ModalToken />
            </Col>
          </Row>
        </Row> 
      )}
    </>
  );
};