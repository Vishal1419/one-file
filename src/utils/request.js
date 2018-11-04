import manipulator from 'object-formdata-convertor';

import types from '../constants/request-types';

export const mockRequest = result => new Promise((resolve) => {
  setTimeout(resolve.bind(null, result), 1000);
});

export const doRequest = (url, method, token = null, body = {}, type = types.JSON) => {
  const options = {
    method,
    headers: {},
  };

  if (token !== null) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  switch (type) {
    case types.FORMDATA:
      if (!['GET', 'HEAD'].includes(method)) {
        options.body = manipulator.JsonToFormData(body);
      }
      break;
    case types.JSON:
      options.headers.Accept = 'application/json';
      options.headers['Content-Type'] = 'application/json';
      if (!['GET', 'HEAD'].includes(method)) {
        options.body = JSON.stringify(body);
      }
      break;
    case types.MULTIPART:
      options.headers['Content-Type'] = 'multipart/form-data';
      if (!['GET', 'HEAD'].includes(method)) {
        const data = new FormData();
        Object.keys(body).forEach(item => data.append(item, body[item]));
        options.body = data;
      }
      break;
    default:
      break;
  }

  return fetch(url, options);
};
