import React from 'react';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';
import isElectron from 'is-electron';

import store from './store';
import './assets/styles/styles.scss';
import Routes from './Routes';

let appVersion;
if (isElectron()) {
	appVersion = window.require('electron').remote.app.getVersion();	
}

const App = () => (
  <div className="App">
    <Helmet>
      <title>{`one-file-${appVersion}`}</title>
    </Helmet>
    <Provider store={store}>
      <Routes />
    </Provider>
  </div>
);

export default App;
