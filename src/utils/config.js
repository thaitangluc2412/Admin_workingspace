export const baseUrl = "http://172.21.1.91:8080/api/v1/";

export const api = (url) => {
  return `${baseUrl}${url} `;
};
