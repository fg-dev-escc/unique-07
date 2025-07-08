import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../db/firebase";
import { Button, Col, Row } from "antd";
import InputTextarea from "../../../components/input/InputTextarea";
import { crearFecha } from "../../../utils/crearFechaString";
import { InputText } from "../../../components/input/InputText";
import { consLogged } from "../../../const/consLogged";
import { startEnviarComentario } from "../../../store/slices/subastaSlice/thunks";

export const Comentarios = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { comentarios } = useSelector((state) => state.subastaReducer);
  const {user, logged} = useSelector(state => state.userReducer);
  const [mensajeError, setMensajeError] = useState(null);
  const [comentario, setComentario] = useState('');

  const handleTexto = ({name, value})=>{
    setComentario(value);
  };

  const handleEnviar =()=>{
    if (!user?.email || logged !== consLogged.LOGGED) {
      setMensajeError('Inicia sesión antes de enviar un comentario');
      return;
    };
    if (comentario.trim() === '' || comentario.length === 0 || comentario === null) {
      setMensajeError('Escribe un comentario');
      return;
    };
    const body = {
      comentario: comentario.trim(),
      torreID: id
    };
    dispatch(startEnviarComentario(body));
    
    setComentario('');
    setMensajeError(null);
  };

  const Mensaje =()=>{
    return <p style={{color:'red', margin: '5px 0'}} >{mensajeError}</p>
  };

  if (!comentarios || comentarios?.length === 0) return <div className="subTitulo">Sin comentarios</div>

  return (
    <Row justify={"center"}>
      <Col xs={16} md={12} lg={10}>
        <InputTextarea 
          labelStyle={{fontSize:'22px', fontWeight: 600,color:' teal', margin:15}} 
          label="Envíanos tus comentarios" 
          name='comentario'
          onChange={e=> handleTexto(e.target)}
          value={comentario}
          size={'large'}
        />
        <Button onClick={handleEnviar}  style={{marginTop:5, backgroundColor:'#f1f1f1'}}>Enviar</Button>
        {mensajeError && <Mensaje />}
      </Col>
      <Col span={24}>
        <div className="subTitulo">Comentarios</div>
      </Col>
      {comentarios.length !== 0 &&
        comentarios.map(comentario => (
          <Col span={16} key={comentario?.Fecha}>
            <div className="Comentarios">

              <div className="ComentariosUsuario">
                <div>
                  <b>Usuario:</b> {comentario?.NickName}
                </div>
                <div>
                  <b>Fecha:</b> {crearFecha( comentario?.Fecha)}
                </div>
              </div>
              <div className="ComentariosComentario">
                <div>
                  <b>Comentario:</b> {comentario?.Comentario}
                </div>
              </div>
            </div>
          </Col>
        ))}
    </Row>
  );
};
