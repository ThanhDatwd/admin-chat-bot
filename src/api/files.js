import { getData } from './axios';

export const fetchUserFiles = async ({ botId, userId }) => {
  try {
    const url = import.meta.env.VITE_API_URL_8085 + `file/${botId}/users/${userId}`;
    const response = await getData(url);

    return response;
  } catch (error) {
    console.error('Error fetching user files:', error);
    throw error;
  }
};
