import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LayoutPage } from "../layout/LayoutPage";
import { startRefreshToken } from "../redux/features/auth/thunks";
import Home from "../views/home/Home";
import About from "../views/about/About";
import Subastas from "../views/subastas/Subastas";
import Contact from "../views/contact/Contact";
import Services from "../views/services/Services";
import Detalle from "../views/detalle/Detalle";
import Vender from "../views/vender/Vender";
import { GlobalMessage } from "../layout/GlobalMessage";

export const ProtectedRoutes = () => {
  let { "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": role } =
    useSelector((state) => state.userReducer.user);
  if (!role) role = []; // no trae ningun role del server

  const dispatch = useDispatch();
  // en caso de que desde back se quite el usuario
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(startRefreshToken());
    }, 30 * 60000); // 30 min =  30 * 60000

    return () => clearInterval(interval);
  }, []);

  return (
    <LayoutPage>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cars" element={<Subastas />} />
        <Route path="/subastas" element={<Subastas />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/detalles/:id" element={<Detalle />} />
        <Route path="/vender" element={<Vender />} />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
      <GlobalMessage />
    </LayoutPage>
  );
};
