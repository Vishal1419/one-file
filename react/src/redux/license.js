import RequestStates from '../constants/request-states';
import createAsyncRequest from '../utils/async-redux.js';
import { addLicense } from '../clients/license';

export const types = {
  SAVE_LICENSE: 'license::save',
  FLUSH_LICENSE: 'license::flush',
  ADD_LICENSE_LOADING: 'license::add::loading',
  ADD_LICENSE_SUCCESS: 'license::add::success',
  ADD_LICENSE_FAILURE: 'license::add::failure',
};

const INITIAL_STATE = {
  license: {},
  requestState: RequestStates.init,
  addLicenseError: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SAVE_LICENSE:
      return {
        ...state,
        license: action.payload,
      };
    case types.FLUSH_LICENSE:
      return {
        ...state,
        license: {},
      };
    case types.ADD_LICENSE_LOADING:
      return {
        ...state,
        requestState: RequestStates.loading,
        addLicenseError: '',
      };
    case types.ADD_LICENSE_SUCCESS:
      return {
        ...state,
        requestState: RequestStates.success,
        addLicenseError: '',
      };
    case types.ADD_LICENSE_FAILURE:
      return {
        ...state,
        requestState: RequestStates.failure,
        addLicenseError: action.payload.message,
      };
    default:
      return state;
  }
};

export const actions = {
  saveLicense: (name, mobile, key) => ({
    type: types.SAVE_LICENSE,
    payload: { name, mobile, key },
  }),
  flushLicense: () => ({
    type: types.FLUSH_LICENSE,
  }),
  addLicense: (name, mobile, key, hdd) => createAsyncRequest({
    asyncRequest: addLicense.bind(null, name, mobile, key, hdd),
    types: {
        success: types.ADD_LICENSE_SUCCESS,
        failure: types.ADD_LICENSE_FAILURE,
        loading: types.ADD_LICENSE_LOADING
    }
  }),
};
