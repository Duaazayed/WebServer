const AUTH_API = `${BASE_API_URL}/auth`; 
const USER_API = `${BASE_API_URL}/user`; 


class AuthService {

  register = (formData) => _post(`${AUTH_API}/register`, formData);

 
  login = (formData) => _post(`${AUTH_API}/login`, formData);

  setExpiration = (maxExpiration) =>
    new Date(new Date().getTime() + maxExpiration * 1000);

  isAuth = () => {
    return getStorage('access_token');
  };

 
  isTokenExpired() {
    const expiryDate = getStorage('expires_in');
    const isExpired = expiryDate === new Date();

    if (isExpired) {
      localStorage.clear();
    }

    return isExpired;
  }

 
  logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };
}

const authService = new AuthService();