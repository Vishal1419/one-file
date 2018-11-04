import React from 'react';
import { Provider } from 'react-redux';

import store from './store';
import './assets/styles/styles.scss';
import Routes from './Routes';

const App = () => (
  <div className="App">
    <Provider store={store}>
      <Routes />
    </Provider>
  </div>
);

export default App;
