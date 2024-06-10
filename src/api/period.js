import { getData, postData, putData } from './axios';

class PeriodsApi {
  getPeriods({ pageNumber, pageSize }) {
    const data = getData(
      import.meta.env.VITE_API_URL_8087 + `period?&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return data;
  }
  getPeriod({ periodId }) {
    const data = getData(import.meta.env.VITE_API_URL_8087 + `period/detail/${periodId}`);
    return data;
  }
  async createPeriod(data) {
    const response = await postData(import.meta.env.VITE_API_URL_8087 + 'period', data);
    return response;
  }
  async updatePeriod(data) {
    const response = await putData(import.meta.env.VITE_API_URL_8087 + 'period', data);
    return response;
  }
}
export const periodsApi = new PeriodsApi();
