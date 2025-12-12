// Works in both Vite (import.meta.env.VITE_*) and CRA (process.env.REACT_APP_*)
function getEnv(nameVite, nameCra) {
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[nameVite] != null) {
      return import.meta.env[nameVite];
    }
  } catch (e) {}
  try {
    if (typeof process !== 'undefined' && process.env && process.env[nameCra] != null) {
      return process.env[nameCra];
    }
  } catch (e) {}
  return '';
}

export const API_BASE_URL = getEnv('VITE_API_BASE_URL', 'REACT_APP_API_BASE_URL') || '';
export const MEDIA_BASE_URL = getEnv('VITE_MEDIA_BASE_URL', 'REACT_APP_MEDIA_BASE_URL') || API_BASE_URL;
