import RequestStates from '../constants/request-states';
import createAsyncRequest from '../utils/async-redux.js';
import { addLicense } from '../clients/license';

export const types = {
  ADD_LICENSE_LOADING: 'license::add::loading',
  ADD_LICENSE_SUCCESS: 'license::add::success',
  ADD_LICENSE_FAILURE: 'license::add::failure',
};

const INITIAL_STATE = {
  requestState: RequestStates.init,
  addLicenseError: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
        requestState: RequestStates.error,
        addLicenseError: action.payload.message,
      };
    default:
      return state;
  }
};

export const actions = {
  addLicense: (name, mobile, key) => createAsyncRequest({
    asyncRequest: addLicense.bind(null, name, mobile, key),
    types: {
        success: types.ADD_LICENSE_SUCCESS,
        error: types.ADD_LICENSE_FAILURE,
        request: types.ADD_LICENSE_LOADING
    }
  }),
};
