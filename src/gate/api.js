import axios from 'axios';
import isEmpty from 'lodash/isEmpty';

const API_V1_URL = "";

import store from '../redux/Store';

const client = axios.create({baseURL: API_V1_URL, json: true});

const call = async (method, url, data = {}) => {
  const token = store.getState().user.token;

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (token !== '') {
    headers.Authorization = `${token}`;
  }

  const request = {headers, method, url};

  if (!isEmpty(data)) {
    request.data = data;
  }

  try {
    const response = await client(request);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response);
  }
};



export default {

  delete: (url, data = {}) => call('delete', url, data),
  get: (url, data = {}) => call('get', url, data),
  patch: (url, data = {}) => call('patch', url, data),
  post: (url, data = {}) => call('post', url, data),
  put: (url, data = {}) => call('put', url, data),
};
