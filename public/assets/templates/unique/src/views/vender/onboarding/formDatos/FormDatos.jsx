import { useState } from 'react';
import { Col, Row } from 'antd';
import { TarjetaUno } from './TarjetaUno';
import { useForm } from './useForm';
import { TarjetaDos } from './TarjetaDos';
import { TarjetaTres } from './TarjetaTres';
import { TarjetaCuatro } from './TarjetaCuatro';
import { Carrucel } from './Carrucel';

export const FormDatos = () => {
  const {form, formValidation, isFormValid ,onChangeInput, onChangeNum, onChangeFotos, handleFotos, handleReset} = useForm();
  const [mensajeError, setMensajeError] = useState(false);

  const cards = [
    <TarjetaUno form={form} onChangeInput={onChangeInput} formValidation={formValidation} mensajeError={mensajeError}/>,
    <TarjetaCuatro />,
    <TarjetaDos form={form} handleFotos={handleFotos} onChangeFotos={onChangeFotos}/>,
    <TarjetaTres />
  ];
  
  console.log(form);
  return (
    <Row justify={'center'}>
      <Col span={24}>
        <Carrucel componentes={cards} form={form} isFormValid={isFormValid} setMensajeError={setMensajeError}/>
      </Col>
    </Row>
  );
};
