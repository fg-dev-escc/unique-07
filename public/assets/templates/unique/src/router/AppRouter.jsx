import { useEffect } from "react";
import { Routes, Route } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { consLogged } from "../const/consLogged";
import { Layout } from "../layout/Layout";
import { Home } from "../views/home/Home";
import { Detalle } from "../views/detalle/Detalle";
import { startRefreshToken } from "../store/slices/auth/thunks";
import { Vender } from "../views/vender/Vender";

export const AppRouter = () => {

  const { logged, user} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startRefreshToken());
  }, []);

  if (logged === consLogged.STARTING) return <>Cargando ...</>

  return (
    <Layout>
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/detalles/:id" element={<Detalle />} />
        <Route path="/vender" element={<Vender />} />
      </Routes>
    </Layout>    
  )
}
