import { getData } from './axios';

class ModelsApi {
  getModels() {
    const data = getData(import.meta.env.VITE_API_URL_8088 + `model-chat`);
    return data;
  }
}
export const modelsApi = new ModelsApi();
