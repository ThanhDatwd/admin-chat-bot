import api, { getData } from './axios';

class KnowledgesApi {
  async getKnowledges({ pageNumber = 0, pageSize = 10 }) {
    const data = await getData(
      import.meta.env.VITE_API_URL_8085 + `knowledge?&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return data;
  }
  async createKnowledges(data) {
    const response = api.post(import.meta.env.VITE_API_URL_8085 + 'knowledge',data);
    return response;
  }
}
export const knowledgesApi = new KnowledgesApi();
