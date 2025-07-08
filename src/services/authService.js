import { API_ENDPOINTS } from '../constants/apiEndpoints';
import { apiRequest } from './apiService';
import { LoginDTO, CreateCompradorDTO, RefreshDTO } from '../types/api.types';

class AuthService {
  constructor() {
    this.tokenKey = 'unique_motors_token';
    this.refreshTokenKey = 'unique_motors_refresh_token';
    this.userKey = 'unique_motors_user';
  }

  // ===== LOGIN =====
  async login(credentials) {
    try {
      const loginData = {
        ...LoginDTO,
        ...credentials,
        app: 'web'
      };

      const response = await apiRequest(API_ENDPOINTS.AUTH.LOGIN, {
        method: 'POST',
        body: JSON.stringify(loginData)
      });

      if (response.success && response.data) {
        this.setAuthData(response.data);
        return {
          success: true,
          user: response.data.user,
          token: response.data.token
        };
      }

      return {
        success: false,
        message: response.message || 'Error en el login'
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Error de conexión'
      };
    }
  }

  // ===== REFRESH TOKEN =====
  async refreshToken() {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const refreshData = {
        ...RefreshDTO,
        token: refreshToken,
        app: 'web'
      };

      const response = await apiRequest(API_ENDPOINTS.AUTH.REFRESH, {
        method: 'POST',
        body: JSON.stringify(refreshData)
      });

      if (response.success && response.data) {
        this.setAuthData(response.data);
        return {
          success: true,
          token: response.data.token
        };
      }

      this.logout();
      return {
        success: false,
        message: 'Token refresh failed'
      };
    } catch (error) {
      console.error('Token refresh error:', error);
      this.logout();
      return {
        success: false,
        message: 'Error refreshing token'
      };
    }
  }

  // ===== CREATE BUYER ACCOUNT =====
  async createComprador(code, password) {
    try {
      const createData = {
        ...CreateCompradorDTO,
        code,
        password
      };

      const response = await apiRequest(API_ENDPOINTS.AUTH.CREATE_COMPRADOR, {
        method: 'POST',
        body: JSON.stringify(createData)
      });

      if (response.success) {
        return {
          success: true,
          message: 'Cuenta de comprador creada exitosamente'
        };
      }

      return {
        success: false,
        message: response.message || 'Error al crear cuenta'
      };
    } catch (error) {
      console.error('Create comprador error:', error);
      return {
        success: false,
        message: 'Error de conexión'
      };
    }
  }

  // ===== PASSWORD RECOVERY =====
  async generatePasswordLink(email) {
    try {
      const response = await apiRequest(API_ENDPOINTS.AUTH.GENERA_LIGA_PASSWORD, {
        method: 'POST',
        body: JSON.stringify({ email })
      });

      if (response.success) {
        return {
          success: true,
          message: 'Link de recuperación enviado al correo'
        };
      }

      return {
        success: false,
        message: response.message || 'Error al enviar link'
      };
    } catch (error) {
      console.error('Generate password link error:', error);
      return {
        success: false,
        message: 'Error de conexión'
      };
    }
  }

  async setPassword(code, password) {
    try {
      const response = await apiRequest(API_ENDPOINTS.AUTH.ESTABLECE_PASSWORD, {
        method: 'POST',
        body: JSON.stringify({ code, password })
      });

      if (response.success) {
        return {
          success: true,
          message: 'Contraseña establecida exitosamente'
        };
      }

      return {
        success: false,
        message: response.message || 'Error al establecer contraseña'
      };
    } catch (error) {
      console.error('Set password error:', error);
      return {
        success: false,
        message: 'Error de conexión'
      };
    }
  }

  // ===== TOKEN MANAGEMENT =====
  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  getRefreshToken() {
    return localStorage.getItem(this.refreshTokenKey);
  }

  getUser() {
    const userStr = localStorage.getItem(this.userKey);
    return userStr ? JSON.parse(userStr) : null;
  }

  setAuthData(authData) {
    if (authData.token) {
      localStorage.setItem(this.tokenKey, authData.token);
    }
    if (authData.refreshToken) {
      localStorage.setItem(this.refreshTokenKey, authData.refreshToken);
    }
    if (authData.user) {
      localStorage.setItem(this.userKey, JSON.stringify(authData.user));
    }
  }

  // ===== SESSION VALIDATION =====
  isAuthenticated() {
    const token = this.getToken();
    if (!token) return false;

    try {
      // Simple token expiration check
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      
      if (payload.exp && payload.exp < currentTime) {
        this.logout();
        return false;
      }
      
      return true;
    } catch (error) {
      this.logout();
      return false;
    }
  }

  // ===== USER ROLES =====
  hasRole(role) {
    const user = this.getUser();
    return user && user.roles && user.roles.includes(role);
  }

  isAdmin() {
    return this.hasRole('Admin');
  }

  isComprador() {
    return this.hasRole('Comprador');
  }

  isVendedor() {
    return this.hasRole('Vendedor');
  }

  // ===== USER INFO =====
  getUserId() {
    const user = this.getUser();
    return user ? user.id : null;
  }

  getUserEmail() {
    const user = this.getUser();
    return user ? user.email : null;
  }

  getUserName() {
    const user = this.getUser();
    return user ? user.name || user.email : null;
  }

  getCompradorId() {
    const user = this.getUser();
    return user ? user.compradorID : null;
  }

  // ===== LOGOUT =====
  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.userKey);
    
    // Optional: Call logout endpoint
    // this.callLogoutEndpoint();
  }

  // ===== AUTO REFRESH =====
  setupAutoRefresh() {
    const token = this.getToken();
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = payload.exp * 1000;
      const currentTime = Date.now();
      const timeUntilExpiry = expirationTime - currentTime;
      
      // Refresh 5 minutes before expiry
      const refreshTime = timeUntilExpiry - (5 * 60 * 1000);
      
      if (refreshTime > 0) {
        setTimeout(() => {
          this.refreshToken().then(result => {
            if (result.success) {
              this.setupAutoRefresh();
            }
          });
        }, refreshTime);
      }
    } catch (error) {
      console.error('Setup auto refresh error:', error);
    }
  }

  // ===== INITIALIZATION =====
  init() {
    if (this.isAuthenticated()) {
      this.setupAutoRefresh();
      return true;
    }
    return false;
  }
}

// Create singleton instance
const authService = new AuthService();

export default authService;

// Named exports for convenience
export const {
  login,
  logout,
  refreshToken,
  createComprador,
  generatePasswordLink,
  setPassword,
  isAuthenticated,
  getToken,
  getUser,
  getUserId,
  getUserEmail,
  getUserName,
  getCompradorId,
  hasRole,
  isAdmin,
  isComprador,
  isVendedor,
  init
} = authService;