import api, { getData, postData } from './axios';

class CustomerApi {
  getCustomers({ pageNumber, pageSize }) {
    const data = getData(
      import.meta.env.VITE_API_URL_8086 + `customer?&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return data;
  }
  getCustomer({ customerId }) {
    const data = getData(import.meta.env.VITE_API_URL_8086 + `customer/detail/${customerId}`);
    return data;
  }
  async createCustomer(data) {
    const response = await api.post(import.meta.env.VITE_API_URL_8086 + 'customer', data);
    return response;
  }
  async createCustomerContract(data) {
    const response = await api.post(import.meta.env.VITE_API_URL_8086 + 'contract', data);
    return response;
  }
  async createCustomerConfig(data) {
    const response = await api.post(import.meta.env.VITE_API_URL_8086 + 'customer/configuration', data);
    return response;
  }
  async getCustomerContract({ customerId }) {
    const response = await api.get(import.meta.env.VITE_API_URL_8086 + `contract/detail/${customerId}`);
    return response;
  }
  async getCustomerConfig(customerId , pagination) {
    const response = await api.get(import.meta.env.VITE_API_URL_8086 + `customer/configuration?customerId=${customerId}&?&pageNumber=${pagination.pageNumber}&pageSize=${pagination.pageSize}`);
    return response;
  }

  async deleteCustomer(customerId) {
    const response = await api.delete(import.meta.env.VITE_API_URL_8086 + `customer/${customerId}`);
    return response;
  }
}
export const customersApi = new CustomerApi();
