import { Button, Col, Input, Row } from "antd";
import { useState } from "react";
import { InputNum } from "../../../components/input/InputNum";
import { useDispatch, useSelector } from "react-redux";
import { startPuja } from "../../../store/slices/subastaSlice/thunks";

const MultiploMil = (numero)=> numero % 1000 === 0;

export const FormPuja = () => {
  const dispatch = useDispatch();
  const {subastaTorre} = useSelector(state => state.subastaReducer);
  const {user} = useSelector(state => state.userReducer);
  const [form, setForm] = useState({});
  const [err, setErr] = useState('');
    
  const handleChange =(num)=>{
    setForm({monto:num, torreID:subastaTorre?.torreID, usuarioPujaID:user.usuarioID, fecha:new Date()});
    setErr('');
  };

  const handleClick =()=>{
    if (!MultiploMil(form.monto)) {
      setErr('La oferta debe ser múltiplo de $1,000');
      return;
    };
    if (!form.monto || form.monto <= 0) {
      setErr('La oferta debe ser mayor a 0');
      return;
    };
    dispatch(startPuja(form));
    setErr('');
  };

  return (
    <>
      <Row justify="center" gutter={10} style={{ marginBottom: 10, width:'100%' }} className="formPuja">
        <Col xs={10} sm={10} md={6} lg={16}>
          <InputNum
            addonBefore="$"
            name="monto"
            onChange={handleChange}
            size="small"
            placeholder="Oferta"
            onPressEnter={handleClick}
          />
        </Col>
        <Col >
          <Button type="primary"
            style={{backgroundColor:'#f1f1f1', color:'black'}}
            onClick={handleClick} 
            size="small"
          >
            Ofertar
          </Button>
        </Col>
      </Row>
      <div style={{ textAlign: "center", color: "orange" }}>{err}</div>
    </>
  );
};
