const formatoFecha = (textoFecha) => {
  // const textoFecha = "30 de junio de 2081";
  const meses = {
    enero: 0,
    febrero: 1,
    marzo: 2,
    abril: 3,
    mayo: 4,
    junio: 5,
    julio: 6,
    agosto: 7,
    septiembre: 8,
    octubre: 9,
    noviembre: 10,
    diciembre: 11,
  };

  const partes = textoFecha.toLowerCase().split(" de "); // ["30", "junio", "2081"]
  const dia = parseInt(partes[0]);
  const mes = meses[partes[1]]; // índice del mes
  const anio = parseInt(partes[2]);

  const fecha = new Date(anio, mes, dia);

  // console.log(fecha); // → Mon Jun 30 2081 00:00:00 GMT...
  return fecha;
};

export const crearCronometro = (fecha) => {
  const fechaLimite = formatoFecha(fecha);
  const ahora = new Date();
  const diferencia = fechaLimite - ahora;

  if (diferencia <= 0) {
    return "00:00:00";
  }

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor(
    (diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

  const formatoDias = String(dias).padStart(2, "0");
  const formatoHoras = String(horas).padStart(2, "0");
  const formatoMinutos = String(minutos).padStart(2, "0");
  const formatoSegundos = String(segundos).padStart(2, "0");

  return `${formatoDias}:${formatoHoras}:${formatoMinutos}:${formatoSegundos}`;
};

export const genCronometro = (fecha) => {
  const ahora = new Date();
  const fin = new Date(fecha);
  const diferencia = fin - ahora;

  if (diferencia <= 0) {
    return "Subasta Terminada";
  }

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));

  // Si quedan más de 30 días, mostrar en días
  if (dias > 30) {
    return `${dias} días restantes`;
  }
  
  // Si quedan más de 1 día, mostrar días y horas
  if (dias > 0) {
    return `${dias}d ${horas}h ${minutos}m`;
  }
  
  // Si queda menos de un día, mostrar solo horas y minutos
  if (horas > 0) {
    return `${horas}h ${minutos}m`;
  }
  
  // Si queda menos de una hora, mostrar solo minutos
  return `${minutos}m`;
};
