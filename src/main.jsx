import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import App from './App.jsx'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

const loadAllScripts = async () => {
  try {
    await loadScript('/assets/js/jquery-3.6.0.min.js');
    
    await Promise.all([
      loadScript('/assets/js/modernizr.min.js'),
      loadScript('/assets/js/bootstrap.bundle.min.js'),
      loadScript('/assets/js/imagesloaded.pkgd.min.js'),
      loadScript('/assets/js/jquery.magnific-popup.min.js'),
      loadScript('/assets/js/isotope.pkgd.min.js'),
      loadScript('/assets/js/jquery.appear.min.js'),
      loadScript('/assets/js/jquery.easing.min.js'),
      loadScript('/assets/js/owl.carousel.min.js'),
      loadScript('/assets/js/counter-up.js'),
      loadScript('/assets/js/jquery-ui.min.js'),
      loadScript('/assets/js/jquery.timepicker.min.js'),
      loadScript('/assets/js/wow.min.js')
    ]);
    
    await loadScript('/assets/js/main.js');
    
    console.log('Todas las librerías cargadas correctamente');
  } catch (error) {
    console.error('Error cargando librerías:', error);
  }
};

loadAllScripts();