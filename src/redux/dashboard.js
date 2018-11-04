import RequestStates from '../constants/request-states';

export const types = {
  ONE_FILE_CREATION_STARTED: 'create::one-file::started',
  SET_LOADING_MESSAGE: 'loading-message::set',
  ONE_FILE_CREATION_COMPLETED: 'create::one-file::completed',
};

const INITIAL_STATE = {
  requestState: RequestStates.init,
  loadingMessage: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.ONE_FILE_CREATION_STARTED:
      return {
        ...state,
        requestState: RequestStates.loading,
      };
    case types.SET_LOADING_MESSAGE:
      return {
        ...state,
        loadingMessage: action.payload,
      };
    case types.ONE_FILE_CREATION_COMPLETED:
      return {
        ...state,
        requestState: RequestStates.success,
      };
    default:
      return state;
  }
};

export const actions = {
  oneFileCreationStarted: () => ({
    type: types.ONE_FILE_CREATION_STARTED,
  }),
  setLoadingMessage: message => ({
    type: types.SET_LOADING_MESSAGE,
  }),
  oneFileCreationCompleted: () => ({
    type: types.ONE_FILE_CREATION_COMPLETED,
  }),
};
