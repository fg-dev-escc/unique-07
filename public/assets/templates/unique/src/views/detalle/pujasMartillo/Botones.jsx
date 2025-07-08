import { PlusOutlined } from "@ant-design/icons"
import { Button, Col, Row, Tooltip } from "antd"
import { formatoMoneda } from "../../../utils/formatoMoneda"
import { useDispatch, useSelector } from "react-redux"
import { startPuja } from "../../../store/slices/subastaSlice/thunks"


export const Botones = () => {
  const dispatch = useDispatch();
  const {subastaTorre} = useSelector(state => state.subastaReducer);
  const {user} = useSelector(state => state.userReducer);
  const {pujaMayor} = useSelector(state => state.subastaReducer);
  
  const handleClick =(suma)=>{
    let monto = pujaMayor?.monto ? pujaMayor.monto : 0;
    monto = suma + monto;

    const body = {
      monto, 
      torreID:subastaTorre?.torreID,
      usuarioPujaID:user?.usuarioID,
      fecha:new Date()
    };
    dispatch(startPuja(body));
  };

  return (
    <Row  style={{ marginTop: 5, marginBottom: 5, width: '100%' }} gutter={[10,10]} justify="center">
      <Col md={4} lg={24}>
        <Tooltip  title='Agregar a la oferta más alta' >
          <Button
            block
            onClick={()=> handleClick(10000)}
            size="small"
            style={{backgroundColor:'#f1f1f1', color:'black'}}
          >
            <PlusOutlined />{formatoMoneda(10000)}
          </Button>
        </Tooltip>
      </Col>
      <Col md={4} lg={24}>
        <Tooltip title='Agregar a la oferta más alta'>
          <Button
            onClick={()=> handleClick(50000)}
            block
            size="small"
            style={{backgroundColor:'#f1f1f1', color:'black'}}
          >
            <PlusOutlined/>{formatoMoneda(50000)}
          </Button>
        </Tooltip>
      </Col>
      <Col md={4} lg={24}>
        <Tooltip title='Agregar a la oferta más alta'>
          <Button
            onClick={()=> handleClick(100000)}
            block
            size="small"
            style={{backgroundColor:'#f1f1f1', color:'black'}}
          >
            <PlusOutlined/>{formatoMoneda(100000)}
          </Button>
        </Tooltip>
      </Col>

    </Row>
  )
}
