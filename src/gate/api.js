import axios from "axios";
import isEmpty from "lodash/isEmpty";
import store from "../redux/Store";

const API_V1_URL = "https://api-dev.covidapp.ir/api/v1";

const client = axios.create({ baseURL: API_V1_URL, json: true });

const call = async (method, url, data = {}) => {
  const token = store.getState().user.token;

  const headers = {
    "Content-Type": "application/json"
  };

  if (token !== "") {
    headers["Access-Token"] = `${token}`;
  }

  const request = { headers, method, url };

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

const auth = {
  register: data => call("post", "/user/register", data),
  activate: data => call("post", "/user/activate", data),
  profile: () => call("get", "/user/profile")
};

export default {
  auth,
  delete: (url, data = {}) => call("delete", url, data),
  get: (url, data = {}) => call("get", url, data),
  patch: (url, data = {}) => call("patch", url, data),
  post: (url, data = {}) => call("post", url, data),
  put: (url, data = {}) => call("put", url, data)
};
