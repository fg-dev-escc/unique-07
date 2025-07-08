import React from "react";

export const Descripcion = ({descripcion}) => {
  return (
    <div className="Detalles_Descripcion">
      {descripcion ? descripcion : "No hay descripción disponible."}
    </div>
  );
};
