import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startGetNuevoVendedor } from '../../../../store/slices/vender/thunks';

export const Carrucel = ({componentes, form, isFormValid, setMensajeError}) => {
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const {loading, respuesta} = useSelector(state=> state.vendedorReducer);
  const [localLoading, setLocalLoading] = useState(false);  
  
  const handleNext = () => {
    if (currentIndex===0) {
      if (!isFormValid()) {
        setMensajeError(true);
        return;
      };
      setMensajeError(false);
      const {nombreCompleto, email, telefono} = form;
      dispatch(startGetNuevoVendedor({nombreCompleto, email, telefono}));
    };

    if ((respuesta.succes)&& (currentIndex < componentes.length - 1) ) {
      setCurrentIndex(currentIndex + 1);
    };
  };
  
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    };
  };

  return (
     <div className='carouselContainer'>
      <div className='buttonContainer'>
        <button onClick={handlePrevious} >Anterior</button>
        <button onClick={handleNext} >Siguiente</button>
      </div>
      <div className='componentWrapper'>
        {componentes[currentIndex]}
      </div>
    </div>
  )
}
