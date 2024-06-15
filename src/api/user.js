import api, { getData, postData } from './axios';

class UserApi {
  async getUserByOrg({ customerId, pagination }) {
    const response = await getData(
      import.meta.env.VITE_API_AUTH_URL_8080 +
        `users/customer?customerId=${customerId}&pageNumber=${pagination.pageNumber}&pageSize=${pagination.pageSize}`
    );
    return response;
  }
  async getUserByAmin({ customerId, pagination }) {
    const response = await getData(
      import.meta.env.VITE_API_AUTH_URL_8080 +
        `users/customer?customerId=${customerId}&pageNumber=${pagination.pageNumber}&pageSize=${pagination.pageSize}`
    );
    return response;
  }
  async getUserByOrgWithGranted({ customerId, botId, pagination }) {
    const response = await getData(
      import.meta.env.VITE_API_URL_8086 +
        `customer/users?customerId=${customerId}&botId=${botId}&pageNumber=${pagination.pageNumber}&pageSize=${pagination.pageSize}`
    );
    return response;
  }
  async getUserWithGranted({ customerId, botId, pagination }) {
    const response = await getData(
      import.meta.env.VITE_API_URL_8086 +
        `customer/users/granted?customerId=${customerId}&botId=${botId}&pageNumber=${pagination.pageNumber}&pageSize=${pagination.pageSize}`
    );
    return response;
  }
  async createUserByOrg(data) {
    const response = await postData(
      import.meta.env.VITE_API_AUTH_URL_8080 + 'users/customers',
      data
    );
    return response;
  }
  async UpdateUser(data) {
    const response = await api.put(import.meta.env.VITE_API_AUTH_URL_8080 + `users`,data);
    return response;
  }
}
export const usersApi = new UserApi();
