export function getToken() {
  return localStorage.getItem('token') || '';
}

export function removeToken() {
  return localStorage.removeItem('token');
}

export function setToken(token: string) {
  return localStorage.setItem('token', token);
}

export function parseToken() {
  let token = getToken();
  if (!token) return null;
  let payload = JSON.parse(atob(token.split('.')[1]));
  return payload;
}
