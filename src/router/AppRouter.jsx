import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { consLogged } from "../const/consLogged";
import { Layout } from "../layout/Layout";
import Home from "../views/home/Home";
import About from "../views/about/About";
import Contact from "../views/contact/Contact";
import Sell from "../views/sell/Sell";
import Detail from "../views/detail/Detail";
import LoginSection from "../views/auth/LoginSection/LoginSection";
import RegisterSection from "../views/auth/RegisterSection/RegisterSection";
import Profile from "../views/profile/Profile";
import ProfileLayout from "../views/profile/ProfileLayout";
import SettingsSection from "../views/profile/SettingsSection/SettingsSection";
import BillingSection from "../views/profile/BillingSection/BillingSection";
import ListingsSection from "../views/profile/ListingsSection/ListingsSection";
import TransactionsSection from "../views/profile/TransactionsSection/TransactionsSection";
import FavoritesSection from "../views/profile/FavoritesSection/FavoritesSection";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { startRefreshToken } from "../redux/features/auth/thunks";

export const AppRouter = () => {

  const { logged, user} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('AppRouter mounted, current logged state:', logged);
    dispatch(startRefreshToken());
    
    const timeout = setTimeout(() => {
      if (logged === consLogged.STARTING) {
        console.log('Timeout reached, forcing NOTLOGGED state');
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [dispatch]);

  console.log('AppRouter render, logged state:', logged);

  if (logged === consLogged.STARTING) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column'
      }}>
        <div>Cargando aplicación...</div>
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          Estado: {logged}
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/vender" element={<Sell />} />
        <Route path="/subasta/:id" element={<Detail />} />
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <LoginSection />
            </PublicRoute>
          } 
        />
        <Route 
          path="/register" 
          element={
            <PublicRoute>
              <RegisterSection />
            </PublicRoute>
          } 
        />
        
        {/* Protected Profile Routes */}
        <Route 
          path="/profile" 
          element={
            <PrivateRoute>
              <ProfileLayout>
                <Profile />
              </ProfileLayout>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/profile/settings" 
          element={
            <PrivateRoute>
              <ProfileLayout title="Configuración">
                <SettingsSection />
              </ProfileLayout>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/profile/billing" 
          element={
            <PrivateRoute>
              <ProfileLayout title="Facturación">
                <BillingSection />
              </ProfileLayout>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/profile/listings" 
          element={
            <PrivateRoute>
              <ProfileLayout title="Mis Publicaciones">
                <ListingsSection />
              </ProfileLayout>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/profile/transactions" 
          element={
            <PrivateRoute>
              <ProfileLayout title="Transacciones">
                <TransactionsSection />
              </ProfileLayout>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/profile/favorites" 
          element={
            <PrivateRoute>
              <ProfileLayout title="Favoritos">
                <FavoritesSection />
              </ProfileLayout>
            </PrivateRoute>
          } 
        />
      </Routes>
    </Layout>    
  )
}
