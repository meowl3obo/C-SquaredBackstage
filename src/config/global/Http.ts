export const allowedMethods = ['HEAD', 'GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'OPTIONS'];

export const headers = {
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
  'charset': 'utf-8',
};

export const timeoutSec = 10;

export const apiUrl = import.meta.env.VITE_API_URL;

export const formDataHeaders = {
  'Accept': '*/*',
  'Content-Type': 'application/x-www-form-urlencoded',
  'X-Requested-With': 'XMLHttpRequest',
  'charset': 'utf-8',
};