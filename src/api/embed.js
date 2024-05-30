import { postData } from './axios';

export const embedBot = async (data) => {
  try {
    const url = import.meta.env.VITE_API_URL_8085 + `bot/embed/files`;
    const response = await postData(url, data);

    return response;
  } catch (error) {
    console.error('Error embed files:', error);
    throw error;
  }
};
