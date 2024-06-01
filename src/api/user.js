import { getData, postData } from './axios';

class UserApi {
  async getUserByOrg(customerId) {
    const response = await getData(import.meta.env.VITE_API_AUTH_URL_8080 + `users/customers/${customerId}`);
    return response;
  }

  async createUserByOrg(data) {
    const response = await postData(import.meta.env.VITE_API_AUTH_URL_8080 + 'users/customers', data);
    return response;
  }

}
export const usersApi = new UserApi();
