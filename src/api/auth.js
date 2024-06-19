import api, { getData, postData } from './axios';

class AuthApi {
  async whoami() {
    const response = await api.get(import.meta.env.VITE_API_AUTH_URL_8080 + `users/user-info/whoami`);
    return response;
  }
  async logout() {
    const response = api.post(import.meta.env.VITE_API_AUTH_URL_8080 + 'auth/logout');
    return response;
  }
}
export const authApi = new AuthApi();
