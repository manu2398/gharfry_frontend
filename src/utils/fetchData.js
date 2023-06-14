import axios from 'axios';
import {endPoint} from '../constants';

export const getDataApi = async (url, token) => {
  const res = await axios.get(`${endPoint}/api/${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const postDataApi = async (url, post, token) => {
  const res = await axios.post(`${endPoint}/api/${url}`, post, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const putDataApi = async (url, post, token) => {
  const res = await axios.put(`${endPoint}/api/${url}`, post, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const patchDataApi = async (url, post, token) => {
  const res = await axios.patch(`${endPoint}/api/${url}`, post, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const deleteDataApi = async (url, token) => {
  const res = await axios.delete(`${endPoint}/api/${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};
