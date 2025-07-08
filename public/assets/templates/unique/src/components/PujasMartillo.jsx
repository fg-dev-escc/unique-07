import { useSelector } from 'react-redux';
import { consLogged } from '../const/consLogged';
import { MensajeSesion } from './MensajeSesion';
import { FormPuja } from '../views/detalle/pujasMartillo/FormPuja';
import { Botones } from '../views/detalle/pujasMartillo/Botones';
import { Pujas } from '../views/detalle/pujasMartillo/Pujas';

export const PujasMartillo = ({torreID}) => {
  const {logged, user} = useSelector(state => state.userReducer);

  if (logged !== consLogged.LOGGED || !user.nombre) 
    return <MensajeSesion 
              texto='Para ver más datos y participar en la subasta, debe iniciar sesíon.'
              paddingTop={0}
            />
  
    return (
    <>
      <FormPuja />
      <Botones />
      <Pujas torreID={torreID}/>
    </>
  )
}