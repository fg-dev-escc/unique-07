import { useDispatch, useSelector } from "react-redux";
import { formatoMoneda } from "../../../utils/formatoMoneda";

export const Titulo = ({titulo, compraAhora}) => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.userReducer);
  const {subastaTorre, pujaMayor} = useSelector(state => state.subastaReducer);
  const ofertaMayor = ()=> user.usuarioID === pujaMayor.usuario ? 'ofertaMayor' : ''

  return (
    <div className="D_1_Contenedor">
      <div className="D_1_Titulo">
        {titulo}
        
      </div>
      <div className={`D_1_Ofertas`}>
        <span className="cajaOfertas">
          <b>Comprar ahora:</b> {subastaTorre.montoSalida && formatoMoneda(subastaTorre?.montoSalida)} {" "}
        </span>
        <span className={`cajaOfertas ${pujaMayor.usuario && ofertaMayor()}`}> 
         <b>Oferta mayor:</b> {pujaMayor?.monto && formatoMoneda(pujaMayor.monto)}
        </span>
      </div>
    </div>
  );
};
