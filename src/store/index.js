import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import reduxBlockUI from 'react-block-ui/reduxMiddleware';

import rootReducer from './rootReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
const store = createStore(
  rootReducer,
  undefined,
  composeEnhancers(
    applyMiddleware(ReduxThunk, reduxBlockUI)
  )
);
  
export default store;