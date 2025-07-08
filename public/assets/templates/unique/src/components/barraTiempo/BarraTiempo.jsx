import { useEffect, useState } from "react";
import { Col, Progress, Row } from "antd";
import { useSelector } from "react-redux";
import { crearFechaConMinutos } from "../../utils/crearFechaString";

export const BarraTiempo = () => {
  const { fechaFin } = useSelector((state) => state.subastaReducer);
  const TIEMPO_TOTAL = 2 * 60 * 1000; // 2 minutos en milisegundos
  const [tiempoRestante, setTiempoRestante] = useState(0);
  const [porcentaje, setPorcentaje] = useState(100);
  const [finSubasta, setFinSubasta] = useState(false);

  const colorBarra = () => {
    console.log(porcentaje);
    if (porcentaje < 25) return "red";
    if (porcentaje < 50) return "orange";
    return "green";
  };

  useEffect(() => {
    const tiempoFinal = new Date(fechaFin).getTime();

    const intervalo = setInterval(() => {
      const ahora = new Date().getTime();
      const diferencia = tiempoFinal - ahora;

      if (diferencia <= 0) {
        clearInterval(intervalo);
        setTiempoRestante(0);
        setFinSubasta(true);
      }else if (diferencia <= TIEMPO_TOTAL) {
        setTiempoRestante(diferencia);
        setPorcentaje((diferencia / TIEMPO_TOTAL) * 100);
        setFinSubasta(false);
      };
    }, 1000);
    return () => clearInterval(intervalo);
  }, [fechaFin]);

  const minutos = Math.floor(tiempoRestante / 1000 / 60);
  const segundos = Math.floor((tiempoRestante / 1000) % 60);
  const formato = `${minutos.toString().padStart(2, "0")}:${segundos
    .toString()
    .padStart(2, "0")}`;
    
  return (
    <Row justify={"center"}>
      
      {tiempoRestante > 0 && (
        <Col span={24}>
          <Progress
            percent={porcentaje}
            showInfo={false}
            percentPosition={{ align: "center", type: "inner" }}
            style={{ color: "white" }}
            size={{ width: "100%", height: "15px" }}
            strokeColor={colorBarra()}
            trailColor="#f1f1f1"
            />
        </Col>
      )}
      <Col span={24}>
        {
          finSubasta && (
            <span style={{ textAlign: "end" }}> Subasta Cerrada </span>
          )
        }
      </Col>
      <Col span={24} style={{display:'flex', justifyContent:'space-between'}}>
        <span style={{ textAlign:'start' }}> Cierre: {(fechaFin ? crearFechaConMinutos(fechaFin): '')}</span>
        {tiempoRestante > 0 && (
          <span style={{ textAlign: "end" }}>{formato} Minutos Restantes </span>
        )} 
      </Col>
    </Row>
  );
};
