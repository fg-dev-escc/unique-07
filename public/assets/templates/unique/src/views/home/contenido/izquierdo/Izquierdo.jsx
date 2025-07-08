import React from "react";
import { Auto1 } from "./Auto1";
import { Col, Divider } from "antd";
import { useSelector } from "react-redux";

export const Izquierdo = () => {
  const {subastaTorres} = useSelector((state) => state.subastaReducer);
  
  if (!subastaTorres.torres || subastaTorres.torres.length === 0) return <p>Sin autos para mostrar</p>
  
  return (
    <div className="contenedorIzquierdo">
      {
        subastaTorres?.torres.map(t=>(
          <Col span={24} key={t.torreID}>
            <Auto1 auto={t} />
            <Divider />
          </Col>
        ))
      }
    </div>
  );
};
