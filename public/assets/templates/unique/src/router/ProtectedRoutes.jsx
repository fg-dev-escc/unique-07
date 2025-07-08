import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { LayoutPage } from "../layout/LayoutPage";
import { Compradores } from "../views/compradores/Compradores";
import { Clientes } from "../views/clientes/Clientes";
import { Articulos } from "../views/articulos/Articulos";
import { Subastas } from "../views/subastas/Subastas";
import { Adjudicaciones } from "../views/adjudicaciones/Adjudicaciones";
import { Usuarios } from "../views/usuarios/Usuarios";
import { startRefreshToken } from "../store/slices/auth/thunks";
import { Home } from "../views/home/Home";
import { GlobalMessage } from "../layout/GlobalMessage";
import { Categorias } from "../views/categorias/Categorias";
import { Detalle } from "../views/clientes/detalle/Detalle";
import { PreCompradores } from "../views/preCompradores/PreCompradores";
import { DetalleArticulo } from "../views/articulos/detalleArticulo/DetalleArticulo";
import { DetalleSubasta } from "../views/subastas/detalleSubasta/DetalleSubasta";
import { startGetEstatusArticulo } from "../store/slices/articulos/thunksArticulos";
import {
  startGetCuentasPagoSelect,
  startGetEstados,
} from "../store/slices/genericos/thunks";
import { DetalleComprador } from "../views/compradores/detalleComprador/DetalleComprador";

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

  useEffect(() => {
    dispatch(startGetEstados());
    dispatch(startGetEstatusArticulo());
    dispatch(startGetCuentasPagoSelect());
  }, []);
  return (
    <LayoutPage>
      <Routes>
        {role.includes("admin_compradores") && (
          <>
            <Route path="/compradores" element={<Compradores />} />
            <Route
              path="/compradores/detalle/:compradorID"
              element={<DetalleComprador />}
            />
            <Route path="/precompradores" element={<PreCompradores />} />
          </>
        )}
        {role.includes("admin_clientes") && (
          <>
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/clientes/detalle/:clienteID" element={<Detalle />} />
          </>
        )}
        {role.includes("admin_articulos") && (
          <>
            <Route path="/Categorias" element={<Categorias />} />
            <Route path="/articulos" element={<Articulos />} />
            <Route
              path="/articulos/detalle/:articuloID"
              element={<DetalleArticulo />}
            />
          </>
        )}
        {role.includes("admin_subastas") && (
          <>
            <Route path="/subastas" element={<Subastas />} />
            <Route
              path="/subastas/detalle/:subastaID"
              element={<DetalleSubasta />}
            />
          </>
        )}
        {role.includes("admin_adjudicaciones") && (
          <Route path="/adjudicaciones" element={<Adjudicaciones />} />
        )}
        {role.includes("admin_usuarios") && (
          <Route path="/usuarios" element={<Usuarios />} />
        )}
        <Route path="/home" element={<Home />} />

        <Route path="/" element={<Navigate to="/compradores" />} />
      </Routes>
      <GlobalMessage />
    </LayoutPage>
  );
};
