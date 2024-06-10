import { getData, postData } from './axios';

class UserApi {
  async getUserByOrg({customerId,pagination}) {
    const response = await getData(import.meta.env.VITE_API_AUTH_URL_8080 + `users/customer?customerId=${customerId}&pageNumber=${pagination.pageNumber}&pageSize=${pagination.pageSize}`);
    return response;
  }
  async getUserByOrgWithGranted({customerId,botId,pagination}) {
    const response = await getData(import.meta.env.VITE_API_AUTH_URL_8080 + `users/customer?customerId=${customerId}&botId=${botId}&pageNumber=${pagination.pageNumber}&pageSize=${pagination.pageSize}`);
    return response;
  }

  async createUserByOrg(data) {
    const response = await postData(import.meta.env.VITE_API_AUTH_URL_8080 + 'users/customers', data);
    return response;
  }

}
export const usersApi = new UserApi();
