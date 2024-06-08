import api, { getData, postData } from './axios';

class AuthApi {
  async whoami() {
    const response = await api.get(import.meta.env.VITE_API_AUTH_URL_8080 + `users/user-info/whoami`);
    return response;
  }
}
export const authApi = new AuthApi();
