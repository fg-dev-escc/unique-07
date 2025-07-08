import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Input, Row } from "antd";
import { MenuOutlined, SearchOutlined } from "@ant-design/icons";
import { ModalLogin } from "../modalLogin/ModalLogin";
import { ModalRegistro } from "../modalRegistro/ModalRegistro";
import { ModalToken } from "../modalToken/ModalToken";
import {
  setModalLogin,
  setModalRegistro,
  setModalToken,
} from "../../../store/slices/modal/modalSlice";
import { logOut } from "../../../store/slices/auth/userSlice";
import { startSetPujaMayor } from "../../../store/slices/subastaSlice/thunks";
import { Busqueda } from "../../../components/Busqueda/Busqueda";

export const ResponsiveMenu = ({isSticky}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { user, logged } = useSelector(
    (state) => state.userReducer
  );

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

  const handleInicio = () => {
    navigate("/");
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <Row justify={"space-between"} style={{ width: "100%", padding: "0 5px"}}>
      <Button onClick={handleOpen}>
        <MenuOutlined color="brown" />
      </Button>
      {open && (
        <Row className="menuModal" style={{top:isSticky && 85, left:isSticky && 0}} onMouseLeave={handleOpen} >
          <Col span={24}>
            <div className="MenuItem" onClick={handleInicio}>
              Inicio
            </div>
          </Col>
          <Col span={24}>
            <div className="MenuItem">Vender</div>
          </Col>
          <Col span={24}>
            <div className="MenuItem">Nosotros</div>
          </Col>
          <Col span={24}>
            <div className="MenuItem">Contacto</div>
          </Col>
          <Col span={24}>
            {logged === "logged" ? (
              <div className="MenuItem">{user.nombre}</div>
            ) : (
              <div className="MenuItem" onClick={handleModalLogin}>
                Login
              </div>
            )}
            <ModalLogin />
          </Col>
          <Col span={24}>
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
          <Col span={24}>
            {logged === "logged" && (
              <div className="MenuItem" onClick={handleModalToken}>
                Tokens: 0
              </div>
            )}
            <ModalToken />
          </Col>
        </Row>
      )}
      <Row justify={"end"} >
        <Col span={24} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
          {/* <Input size="small" placeholder="Buscar" style={{ maxWidth: 200 }} /> */}
          <Busqueda />
          <SearchOutlined />
        </Col>
      </Row>
    </Row>
  );
};