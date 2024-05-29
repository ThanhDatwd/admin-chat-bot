import { getData } from './axios';

class KnowledgesApi {
  async getKnowledges({ pageNumber = 0, pageSize = 10 }) {
    const data = await getData(
      import.meta.env.VITE_API_URL_8085 + `knowledge?&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return data;
  }
}
export const knowledgesApi = new KnowledgesApi();
