import { esEmailValido } from "./esEmailValido";
import { esSoloNumero } from "./esSoloNumero";

 export const formValidationsDatosVendedor ={
  nombreCompleto: [(value) => value.length >= 3, 'Mínimo 3 caracteres'],
  email: [(value) => value !== null && esEmailValido(value), 'Correo no válido'],
  telefono:[(value) => value !== null && esSoloNumero(value),'10 números'],
 }