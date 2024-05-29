import { postData } from './axios';

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
