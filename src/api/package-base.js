import { getData, postData, putData } from './axios';

class PackageBasesApi {
  getPackageBases({ pageNumber, pageSize }) {
    const data = getData(
      import.meta.env.VITE_API_URL_8088 +
        `package-base?&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return data;
  }
  getPackageBase({ packageBaseId }) {
    const data = getData(
      import.meta.env.VITE_API_URL_8088 + `package-base/detail/${packageBaseId}`
    );
    return data;
  }
  async createPackageBase(data) {
    const response = await postData(import.meta.env.VITE_API_URL_8088 + 'package-base', data);
    return response;
  }
  async updatePackageBase(data) {
    const response = await putData(import.meta.env.VITE_API_URL_8088 + 'package-base', data);
    return response;
  }
}
export const packageBasesApi = new PackageBasesApi();
