import Header from './Header';
import Footer from './Footer';
import ScrollTop from '../components/ui/ScrollTop';

export const Layout = ({ children }) => {
  return (
    <div className="App">
      <div className="preloader">
        <div className="loader-ripple">
          <div></div>
          <div></div>
        </div>
      </div>

      <Header />
      <main className="main">
        {children}
      </main>
      <Footer />
      <ScrollTop />
    </div>
  );
};