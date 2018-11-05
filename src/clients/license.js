import { doRequest } from '../utils/request.js';

const apiUrl = 'http://139.59.18.253:80';

export const addLicense = (name, mobile_no, key) => {
    return doRequest(`${apiUrl}/user/save`, 'POST', {
      name,
      mobile_no,
      key,
      hdd: 12312231231
    });
};