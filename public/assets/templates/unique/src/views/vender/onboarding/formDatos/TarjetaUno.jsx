import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Col, Row } from "antd"
import { InputText } from "../../../../components/input/InputText";
import { startGetNuevoVendedor } from "../../../../store/slices/vender/thunks";
import { esEmailValido } from "../../../../utils/esEmailValido";
import { esSoloNumero } from "../../../../utils/esSoloNumero";
import { useForm } from "./useForm";

export const TarjetaUno = ({form, formValidation, onChangeInput, mensajeError}) => {
  const dispatch = useDispatch();
  const colSize = { xs:12, sm:8, md:4, lg:4 };
  
  return (
    <>
      <p >Datos personales</p>
      <Row gutter={[10,10]} justify={'start'} className="formTarjeta" align={'middle'} style={{marginTop:10, padding:10}}>
          <Col xs={colSize.xs} sm={colSize.sm} md={colSize.md} lg={colSize.lg}>
            <InputText
              label='Nombre Completo'
              onChange={e=> onChangeInput(e.target)}
              name='nombreCompleto'
              value={form.nombreCompleto}
              err={formValidation?.nombreCompletoValid && mensajeError}
            />
            {mensajeError && <span style={{fontSize:12}}>{formValidation.nombreCompletoValid}</span>}
          </Col>
          <Col xs={colSize.xs} sm={colSize.sm} md={colSize.md} lg={colSize.lg}>
            <InputText
              label='Email'
              onChange={e=> onChangeInput(e.target)}
              name='email'
              value={form.email}
              err={formValidation?.email && mensajeError}
            />
            {mensajeError && <span style={{fontSize:12}}>{formValidation.emailValid}</span>}
          </Col >
          <Col xs={colSize.xs} sm={colSize.sm} md={colSize.md} lg={colSize.lg}>
            <InputText
              label='Teléfono'
              onChange={e=> onChangeInput(e.target)}
              name='telefono'
              value={form.telefono}
              err={formValidation?.telefonoValid && mensajeError}
            />
            {mensajeError && <span style={{fontSize:12}}>{formValidation.telefonoValid}</span>}
          </Col>        
      </Row>
    </>
  )
}
