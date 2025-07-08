import { useState } from "react";
import { useDispatch } from "react-redux";
import { startRegistro } from "../../../../store/slices/registro/thunks";
import { setRegistroNull } from "../../../../store/slices/registro/registroSlice";

export const useRegistro = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({});

  const changeData = ({ target }) => {
    setData({ ...data, [target.name]: target.value });
  };

  const changeSelect =({name, value})=>{
    setData({...data, [name]:value});
  };

  const formSubmit = () => {
    dispatch(setRegistroNull());
    dispatch(startRegistro(data));

  }

  const isDiabled = () => {
    if (!data.email || !data.confirmaEmail || !data.comoSeEntero) return true;
    return false;
  };

  return { changeData, formSubmit, isDiabled, changeSelect ,data};
};
