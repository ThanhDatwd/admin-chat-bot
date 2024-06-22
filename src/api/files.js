import api, { getData, postData } from './axios';

export const fetchUserFiles = async ({ botId, customerId }) => {
  try {
    const url = import.meta.env.VITE_API_URL_8085 + `file/${botId}/customer/${customerId}`;
    const response = await getData(url);

    return response;
  } catch (error) {
    console.error('Error fetching user files:', error);
    throw error;
  }
};

export const uploadFile = async ({ file, botId = undefined, userId, isPublic = false }) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    if (botId) formData.append('botId', botId);
    formData.append('userId', userId);
    formData.append('isPublic', isPublic);

    const response = await postData(import.meta.env.VITE_API_URL_8085 + 'file', formData);

    return response;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export const downloadFile = async ({ fileKey, fileName }) => {
  try {
    const url =
      import.meta.env.VITE_API_URL_8085 + `file/download?fileKey=${fileKey}&fileName=${fileName}`;
    await getData(url);

    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error download files:', error);
    throw error;
  }

};
export const  deleteFileByBot = async({ botId, customerId })=> {
  const response = await api.delete(import.meta.env.VITE_API_URL_8085 + `file/${botId}/customer/${customerId}`);
  return response;
}
