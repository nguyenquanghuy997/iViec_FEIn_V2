import { handleRefreshToken } from "./jwt";
import { DOMAIN_SERVER_API } from "@/config";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: DOMAIN_SERVER_API,
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      handleRefreshToken();
      return;
    }
    return Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    );
  }
);

export const _getApi = (url, data) =>
  axiosInstance.get(url, data).then((response) => response.data);

export const _postApi = (url, data, headers = {}) =>
  axiosInstance.post(url, data, headers).then((response) => response.data);

export const _putApi = (url, data) =>
  axiosInstance.put(url, data).then((response) => response.data);

export const _patchApi = (url, data) =>
  axiosInstance.patch(url, data).then((response) => response.data);

export const _deleteApi = (url) =>
  axiosInstance.delete(url).then((response) => response.data);

export const _uploadApi = (url, data) =>
  axiosInstance
    .post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);

export default axiosInstance;

export const convertUrl = (url, params) => {
  let result = "";
  for (const key in params) {
    const item = params[key];

    if (Array.isArray(item)) {
      item.forEach((i) => {
        const _i = typeof i === "object" ? JSON.stringify(i) : i;
        if (_i) result += `&${key}=${_i}`;
      });
      continue;
    }

    const _item = typeof item === "object" ? JSON.stringify(item) : item;
    if (!_item) continue;
    if (url.includes(`{${key}}`)) url = url.replace(`{${key}}`, _item);
    else result += `&${key}=${_item}`;
  }
  return `${url}?${result}`;
};
