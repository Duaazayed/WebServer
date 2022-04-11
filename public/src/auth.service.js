const AUTH_API = `${BASE_API_URL}/auth`; // http://localhost:5000/api/auth
const USER_API = `${BASE_API_URL}/user`; // http://localhost:5000/api/user

const register = (formData) => _post(`${AUTH_API}/register`, formData);

const login = (formData) => _post(`${AUTH_API}/login`, formData);

const logout = () => {
  clearStorage('isAuth');
  clearStorage('access_token');
  clearStorage('refresh_token');
};