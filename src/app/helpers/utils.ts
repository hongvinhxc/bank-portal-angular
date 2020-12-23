export function getToken() {
  return localStorage.getItem('token') || "";
}

export function removeToken() {
  return localStorage.removeItem('token');
}

export function setToken(token: string) {
  return localStorage.setItem('token', token);
}
