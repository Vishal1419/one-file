import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import dashboardReducer from '../redux/dashboard';
import licenseReducer from '../redux/license';

const rootReducer = combineReducers({
  form: formReducer,
  dashboard: dashboardReducer,
  license: licenseReducer,
});

export default rootReducer;
