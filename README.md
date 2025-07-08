# Documentación Técnica

### Índice
- [Stack Tecnológico](#stack-tecnológico)
- [Estructura de Directorios](#estructura-de-directorios)
- [Componentes](#componentes)
- [Enrutamiento](#enrutamiento)
- [Integración CSS](#css)
- [Información del Proyecto](#información-del-proyecto)

---

## Stack Tecnológico
```javascript
{
  "react": "19.1.0",              
  "react-dom": "19.1.0",          
  "react-router-dom": "7.6.3",    
  "vite": "7.0.0",                
  "framer-motion": "12.23.0",     
  "swiper": "11.2.10"             
}
```



## Estructura de Directorios

```
src/
├── components/
│   ├── layout/          
│   │   ├── header.jsx   
│   │   └── footer.jsx   
│   ├── sections/        
│   │   ├── heroslider.jsx      
│   │   ├── findcarform.jsx     
│   │   ├── cararea.jsx         
│   │   ├── counterarea.jsx     
│   │   ├── faqarea.jsx         
│   │   └── testimonialarea.jsx 
│   └── ui/              
│       ├── breadcrumb.jsx      
│       ├── carsidebar.jsx      
│       └── scrolltop.jsx       
├── pages/               
│   ├── home.jsx         
│   ├── cars.jsx         
│   ├── about.jsx        
│   ├── contact.jsx      
│   └── services.jsx     
├── app.jsx              
├── app.css              
├── index.css            
└── main.jsx             
```

## Componentes

| Tipo | Propósito | Ejemplos |
|------|-----------|----------|
| **layout** | estructura y navegación | header, footer |
| **pages** | componentes de ruta | home, cars, about |
| **sections** | bloques de contenido | heroSlider, aboutArea |
| **ui** | elementos reutilizables | breadCrumb, scrollTop |


## Enrutamiento

```javascript
import { routes, route } from 'react-router-dom';

<routes>
  <route path="/" element={<home />} />
  <route path="/about" element={<about />} />
  <route path="/cars" element={<cars />} />
  <route path="/contact" element={<contact />} />
  <route path="/services" element={<services />} />
</routes>
```

## Route
```
pages/
├── home.jsx               route: /
├── about.jsx              route: /about  
├── cars.jsx               route: /cars
├── contact.jsx            route: /contact
└── services.jsx           route: /services
```

## CSS

```css
@import url('/assets/css/bootstrap.min.css');
@import url('/assets/css/all-fontawesome.min.css');
@import url('/assets/css/animate.min.css');
@import url('/assets/css/magnific-popup.min.css');
@import url('/assets/css/owl.carousel.min.css');
@import url('/assets/css/jquery-ui.min.css');
@import url('/assets/css/jquery.timepicker.min.css');
@import url('/assets/css/style.css');
```
---


### Información del Proyecto


| **Desarrollo React** | **Luis Fernández** |
|---|---|
| **Template Base** | Carway - Car Rental HTML5 Template |
| **Creación Template** | 22/08/2022 |
| **Última Actualización Template** | 29/04/2024 |
| **Adaptación React** | 2025 |
| **README** | Luis Fernández |

### **Nota Legal**

> Esta adaptación React respeta los términos de licencia del template original "Carway" de ThemesLand. El código React es desarrollo original de Luis Fernández basado en el diseño y funcionalidades del template licenciado.

<div align="center">

![License](https://img.shields.io/badge/Template-ThemesLand-FF6B35?style=flat-square)
![React](https://img.shields.io/badge/React_Code-Luis_Fernández-61DAFB?style=flat-square)
![Status](https://img.shields.io/badge/License-Compliant-4CAF50?style=flat-square)

</div>