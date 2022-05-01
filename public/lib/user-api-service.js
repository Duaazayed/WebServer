const USER_API_ME = `${BASE_API_URL}/user/me`; // http://localhost:3000/api/user/me

class UserApiService {
  getMe = () => _get(USER_API_ME, DEFAULT_OPTIONS_WITH_AUTH);

  updateMe = (formData) =>
    _put(`${USER_API_ME}/update`, formData, DEFAULT_OPTIONS_WITH_AUTH);
}

const userService = new UserApiService();