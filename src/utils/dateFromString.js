import { MesCorto } from "./MesCorto";
import { MesLargo } from "./MesLargo";

export const dateFromString = (date) => {
  if (date === "" || !date) return "";
 
  ///
  const f = new Date(date);
  const dia = Number(f.getDate()) > 9 ? f.getDate() : `0${f.getDate()}`;
  const mes =
    Number(f.getMonth() + 1) > 9 ? f.getMonth() + 1 : `0${f.getMonth() + 1}`;
  const mesLago = MesLargo(f.getMonth() + 1);
  const mesCorto = MesCorto(f.getMonth() + 1);
  const anio =
    Number(f.getFullYear()) > 9 ? f.getFullYear() : `0${f.getFullYear()}`;

  const hh = Number(f.getHours()) > 9 ? f.getHours() : `0${f.getHours()}`;
  const mm = Number(f.getMinutes()) > 9 ? f.getMinutes() : `0${f.getMinutes()}`;

  const f1 = `${dia}-${mes}-${f.getFullYear()} ${hh}:${mm}`;
  const soloFecha = `${dia}-${mes}-${f.getFullYear()}`;

  const dateStep = `${mesCorto} ${dia}, ${hh}:${mm}`;
  return { f1, soloFecha, dia, mes, mesLago, mesCorto, anio, hh, mm, dateStep };
};
