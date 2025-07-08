import React, { useEffect, useState } from "react";
import { crearCronometro } from "../../../utils/crearCronometro";

export const Card = ({car, click}) => {
  const [tiempoRestante, setTiempoRestante] = useState(crearCronometro(car.termina));
  
  useEffect(() => {
    const intervalo = setInterval(() => {
      const nuevoTiempo = crearCronometro(car.termina);
      setTiempoRestante(nuevoTiempo);
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);
  
  return (
    <div className="carousel-item" onClick={() => click(car)}>
      <img src={car.url} alt={car.altText} className="imgCarousell" />
      <h3>{car.title}</h3>
      <p>
        <strong>Termina en: </strong> {car.termina ? tiempoRestante : "N/A"}
      </p>
    </div>
  );
};
