export const authConfig = {
  data: {
    breadcrumb: {
      loginTitle: "Iniciar Sesión",
      loginPage: "Iniciar Sesión",
      registerTitle: "Crear Cuenta",
      registerPage: "Crear Cuenta"
    },
    labels: {
      loginTitle: "Iniciar Sesión",
      loginSubtitle: "Inicia sesión en tu cuenta de Unique Motors para participar en las subastas",
      registerTitle: "Crear Cuenta",
      registerSubtitle: "Regístrate en Unique Motors para comenzar a participar en nuestras subastas de autos",
      
      // Login form
      email: "Correo Electrónico",
      password: "Contraseña",
      loginButton: "Iniciar Sesión",
      forgotPassword: "¿Olvidaste tu contraseña?",
      noAccount: "¿No tienes cuenta?",
      createAccount: "Crear cuenta",
      
      // Register form
      firstName: "Nombre Completo",
      lastName: "Apellido",
      confirmPassword: "Confirmar Contraseña",
      registerButton: "Crear Cuenta",
      hasAccount: "¿Ya tienes cuenta?",
      loginHere: "Iniciar sesión aquí",
      
      // Common
      or: "O",
      loginWith: "Iniciar sesión con",
      signUpWith: "Registrarse con",
      google: "Google",
      facebook: "Facebook",
      
      // Terms
      termsAgreement: "Al registrarte, aceptas nuestros",
      termsOfService: "Términos de Servicio",
      and: "y",
      privacyPolicy: "Política de Privacidad"
    },
    placeholders: {
      email: "tu.correo@ejemplo.com",
      password: "Tu contraseña",
      firstName: "Tu nombre completo",
      lastName: "Tu apellido",
      confirmPassword: "Confirma tu contraseña"
    }
  },
  
  helpers: {
    validateEmail: (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    
    validatePassword: (password) => {
      return password.length >= 8;
    },
    
    validatePasswordMatch: (password, confirmPassword) => {
      return password === confirmPassword;
    },
    
    validateName: (name) => {
      return name.length >= 2;
    }
  }
};