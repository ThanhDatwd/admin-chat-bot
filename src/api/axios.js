/* eslint-disable no-useless-catch */
import axios from 'axios';

// create an axios instance
const api = axios.create({
  withCredentials: false,
  timeout: 5000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    // const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const userId = localStorage.getItem('userId');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
        'X-Sub': userId,
      };
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use((response) => {
  //   const res = response.data;
  //   if (res.code !== 200) {
  //     toast.error(res.msg);
  //     if (res.code === 412) {
  //       localStorage.removeItem("token");
  //     }
  //     return Promise.reject(res.msg || "Error");
  //   } else {
  //     return res;
  //   }
  // },
  // (error) => {
  //   console.log("err" + error);
  //   toast.error(error.message);
  //   return Promise.reject(error.message);
  return response.data;
});

export const postData = async (url, data) => {
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getData = async (url) => {
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patchData = async (url, data) => {
  try {
    const response = await api.patch(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const putData = async (url, data) => {
  try {
    const response = await api.put(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteData = async (url) => {
  try {
    const response = await api.delete(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;
