import { getData, postData } from './axios';

class BotsApi {
  getBots({ pageNumber, pageSize }) {
    const data = getData(
      import.meta.env.VITE_API_URL_8085 + `bot?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return data;
  }
  getBotsByCustomer({customerId,pagination}) {
    const data = getData(
      import.meta.env.VITE_API_URL_8085 + `bot?customerId=${customerId}&pageNumber=${pagination.pageNumber}&pageSize=${pagination.pageSize}`
    );
    return data;
  }
  getBot({ botId }) {
    const data = getData(import.meta.env.VITE_API_URL_8085 + `bot/detail?botId=${botId}`);
    return data;
  }
  async createBot(data) {
    const response = await postData(import.meta.env.VITE_API_URL_8085 + 'bot', data);
    return response;
  }
  async grantUserToBot(data) {
    const response = await postData(import.meta.env.VITE_API_URL_8086 + 'customer/bots', data);
    return response;
  }
}
export const botsApi = new BotsApi();
