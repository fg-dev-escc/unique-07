
export const crearFecha = (fechaOriginal)=>{
  // const fechaOriginal = "2025-06-20T20:37:32";
  const fecha = new Date(fechaOriginal);

  const year = fecha.getFullYear();
  const month = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses empiezan en 0
  const day = String(fecha.getDate()).padStart(2, '0');

  const fechaFormateada = `${year}-${month}-${day}`;
  return fechaFormateada;
};


export const crearFechaConMinutos = (fechaOriginal)=>{
  // const fechaOriginal = "2025-06-20T20:37:32";
  const fecha = new Date(fechaOriginal);

  const year = fecha.getFullYear();
  const month = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses empiezan en 0
  const day = String(fecha.getDate()).padStart(2, '0');
  const hours = String(fecha.getHours()).padStart(2,0);
  const min = String(fecha.getMinutes()).padStart(2,0);

  const fechaFormateada = `${year}-${month}-${day} ${hours}:${min}Hrs`;
  return fechaFormateada;
};