import { getData } from './axios';

class BotsApi {
  getBots({ pageNumber, pageSize }) {
    const data = getData(
      import.meta.env.VITE_API_URL_8085 + `bot?&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return data;
  }
  getBot({ botId }) {
    const data = getData(import.meta.env.VITE_API_URL_8085 + `bot/detail?botId=${botId}`);
    return data;
  }
}
export const botsApi = new BotsApi();
