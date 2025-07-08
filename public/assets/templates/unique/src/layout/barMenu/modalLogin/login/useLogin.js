import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLogin } from "../../../../store/slices/auth/thunks";

export const useLogin = () => {
  const dispatch = useDispatch();
  const { loginErr, loadingLogin } = useSelector((state) => state.userReducer);
  const [data, setData] = useState({});

  const changeData = ({ target }) => {
    setData({ ...data, [target.name]: target.value });
  };

  const formSubmit = () => dispatch(startLogin(data));

  const isDiabled = () => {
    if (!data.email || !data.password || loadingLogin) return true;
    return false;
  };

  return { loginErr, loadingLogin, changeData, formSubmit, isDiabled ,data};
};
