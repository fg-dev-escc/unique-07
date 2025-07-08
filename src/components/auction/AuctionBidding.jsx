import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../db/firebase';
import { consLogged } from '../../const/consLogged';
import { setFechaFin, setPujaMayor, setTorreComentarios } from '../../redux/features/auction/auctionSlice';
import SessionMessage from '../feedback/SessionMessage';
import BiddingForm from './BiddingForm';
import BiddingButtons from './BiddingButtons';
import BiddingList from './BiddingList';

export const AuctionBidding = ({ torreID }) => {
  const dispatch = useDispatch();
  const [pujas, setPujas] = useState([]);
  const { logged, user } = useSelector(state => state.userReducer);
  const sesion = logged !== consLogged.LOGGED || !user.email;

  useEffect(() => {
    const unsuscribe = onSnapshot(
      doc(db, "torres", torreID),
      documento => {
        const fechaFin = documento.data().fechaFin;
        const comentarios = documento.data().comentarios.sort((a, b) => new Date(b.Fecha) - new Date(a.Fecha));
        dispatch(setFechaFin(fechaFin));
        dispatch(setTorreComentarios(comentarios));
        
        if (!sesion) {          
          const arregloPujas = documento.data().pujas.sort((a,b)=> b.Monto - a.Monto);
          setPujas(arregloPujas.slice(0,5));
          dispatch(setPujaMayor({monto:arregloPujas[0].Monto, usuario:arregloPujas[0].UsuarioPujaID}));
        };
      }
    );
    
    return ()=> unsuscribe();
  }, [sesion, torreID, dispatch]);

  if (sesion) 
    return <SessionMessage 
              texto='Para ver más datos y participar en la subasta, debe iniciar sesíon.'
              paddingTop={0}
            />
  
  return (
    <div className="auction-bidding">
      <BiddingForm />
      <BiddingButtons />
      <BiddingList pujas={pujas} />
    </div>
  );
};

export default AuctionBidding;