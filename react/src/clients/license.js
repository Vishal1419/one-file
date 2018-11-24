import { doRequest } from '../utils/request.js';
import { API_URL } from '../constants/config';

export const addLicense = (name, mobile_no, key, hdd) => {
  return doRequest(`${API_URL}/user`, 'POST', null, {
    name,
    mobile_no,
    key,
    hdd,
  });
};