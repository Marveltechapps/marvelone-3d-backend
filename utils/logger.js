// Simple logger utility
export const logger = {
  info(message, data = {}) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [INFO] ${message}`, Object.keys(data).length > 0 ? JSON.stringify(data, null, 2) : '');
  },

  error(message, data = {}) {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] [ERROR] ${message}`, Object.keys(data).length > 0 ? JSON.stringify(data, null, 2) : '');
  },

  warn(message, data = {}) {
    const timestamp = new Date().toISOString();
    console.warn(`[${timestamp}] [WARN] ${message}`, Object.keys(data).length > 0 ? JSON.stringify(data, null, 2) : '');
  }
};
