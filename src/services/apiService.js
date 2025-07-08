import authService from './authService';

// API Base Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.subasta30.com';

// Request interceptor to add auth headers
const addAuthHeaders = (options = {}) => {
  const token = authService.getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return {
    ...options,
    headers
  };
};

// Main API request function
export const apiRequest = async (endpoint, options = {}) => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = addAuthHeaders(options);

    const response = await fetch(url, config);
    
    // Handle 401 - Token expired
    if (response.status === 401 && authService.getRefreshToken()) {
      const refreshResult = await authService.refreshToken();
      if (refreshResult.success) {
        // Retry original request with new token
        const retryConfig = addAuthHeaders(options);
        const retryResponse = await fetch(url, retryConfig);
        return await handleResponse(retryResponse);
      } else {
        // Refresh failed, redirect to login
        authService.logout();
        window.location.href = '/auth';
        return {
          success: false,
          message: 'Session expired'
        };
      }
    }

    return await handleResponse(response);
  } catch (error) {
    console.error('API request error:', error);
    return {
      success: false,
      message: 'Network error',
      error: error.message
    };
  }
};

// Response handler
const handleResponse = async (response) => {
  const contentType = response.headers.get('content-type');
  
  try {
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      
      if (response.ok) {
        return {
          success: true,
          data,
          status: response.status
        };
      } else {
        return {
          success: false,
          message: data.message || data.title || 'Request failed',
          errors: data.errors || [],
          status: response.status,
          data
        };
      }
    } else if (response.ok) {
      // Handle non-JSON responses (like file downloads)
      return {
        success: true,
        data: response,
        status: response.status
      };
    } else {
      const text = await response.text();
      return {
        success: false,
        message: text || 'Request failed',
        status: response.status
      };
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to parse response',
      error: error.message,
      status: response.status
    };
  }
};

// File upload helper
export const uploadFile = async (endpoint, file, additionalData = {}) => {
  try {
    const formData = new FormData();
    formData.append('File', file);
    
    // Add additional form data
    Object.keys(additionalData).forEach(key => {
      formData.append(key, additionalData[key]);
    });

    const token = authService.getToken();
    const headers = {};
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData
    });

    return await handleResponse(response);
  } catch (error) {
    console.error('File upload error:', error);
    return {
      success: false,
      message: 'Upload failed',
      error: error.message
    };
  }
};

// Download file helper
export const downloadFile = async (endpoint, filename) => {
  try {
    const response = await apiRequest(endpoint, {
      method: 'GET'
    });

    if (response.success && response.data instanceof Response) {
      const blob = await response.data.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      return { success: true };
    }

    return response;
  } catch (error) {
    console.error('File download error:', error);
    return {
      success: false,
      message: 'Download failed',
      error: error.message
    };
  }
};

// GET request helper
export const get = (endpoint, params = {}) => {
  let url = endpoint;
  
  if (Object.keys(params).length > 0) {
    const searchParams = new URLSearchParams();
    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key] !== undefined) {
        searchParams.append(key, params[key]);
      }
    });
    url += `?${searchParams.toString()}`;
  }

  return apiRequest(url, { method: 'GET' });
};

// POST request helper
export const post = (endpoint, data = {}) => {
  return apiRequest(endpoint, {
    method: 'POST',
    body: JSON.stringify(data)
  });
};

// PUT request helper
export const put = (endpoint, data = {}) => {
  return apiRequest(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
};

// DELETE request helper
export const del = (endpoint) => {
  return apiRequest(endpoint, { method: 'DELETE' });
};

// PATCH request helper
export const patch = (endpoint, data = {}) => {
  return apiRequest(endpoint, {
    method: 'PATCH',
    body: JSON.stringify(data)
  });
};

// Request queue for handling multiple simultaneous requests
class RequestQueue {
  constructor() {
    this.queue = [];
    this.processing = false;
  }

  async add(requestFn) {
    return new Promise((resolve, reject) => {
      this.queue.push({ requestFn, resolve, reject });
      this.process();
    });
  }

  async process() {
    if (this.processing || this.queue.length === 0) return;

    this.processing = true;

    while (this.queue.length > 0) {
      const { requestFn, resolve, reject } = this.queue.shift();
      
      try {
        const result = await requestFn();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    }

    this.processing = false;
  }
}

export const requestQueue = new RequestQueue();

// Retry mechanism for failed requests
export const retryRequest = async (requestFn, maxRetries = 3, delay = 1000) => {
  let lastError;

  for (let i = 0; i < maxRetries; i++) {
    try {
      const result = await requestFn();
      if (result.success) {
        return result;
      }
      lastError = result;
    } catch (error) {
      lastError = {
        success: false,
        message: error.message,
        error
      };
    }

    if (i < maxRetries - 1) {
      await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
    }
  }

  return lastError;
};

// Batch requests helper
export const batchRequests = async (requests) => {
  try {
    const promises = requests.map(({ endpoint, options }) => 
      apiRequest(endpoint, options)
    );

    const results = await Promise.allSettled(promises);
    
    return results.map((result, index) => ({
      index,
      success: result.status === 'fulfilled',
      data: result.status === 'fulfilled' ? result.value : null,
      error: result.status === 'rejected' ? result.reason : null
    }));
  } catch (error) {
    console.error('Batch requests error:', error);
    return requests.map((_, index) => ({
      index,
      success: false,
      data: null,
      error: error.message
    }));
  }
};

// Cache for GET requests
class ApiCache {
  constructor() {
    this.cache = new Map();
    this.ttl = 5 * 60 * 1000; // 5 minutes default TTL
  }

  set(key, data, customTtl = null) {
    const expiry = Date.now() + (customTtl || this.ttl);
    this.cache.set(key, { data, expiry });
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  clear() {
    this.cache.clear();
  }

  delete(key) {
    this.cache.delete(key);
  }
}

export const apiCache = new ApiCache();

// Cached GET request
export const getCached = async (endpoint, params = {}, ttl = null) => {
  const cacheKey = `${endpoint}?${JSON.stringify(params)}`;
  const cached = apiCache.get(cacheKey);
  
  if (cached) {
    return cached;
  }

  const result = await get(endpoint, params);
  
  if (result.success) {
    apiCache.set(cacheKey, result, ttl);
  }

  return result;
};

// Clear cache for specific patterns
export const clearCache = (pattern = null) => {
  if (pattern) {
    const keys = Array.from(apiCache.cache.keys());
    keys.forEach(key => {
      if (key.includes(pattern)) {
        apiCache.delete(key);
      }
    });
  } else {
    apiCache.clear();
  }
};