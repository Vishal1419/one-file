import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import LicenseHOC from './hoc/license';

import Dashboard from './scenes/Dashboard';
import License from './scenes/License';

const Routes = () => (
  <HashRouter>
    <div>
      <Switch>
        <Route exact path="/" component={LicenseHOC(Dashboard)} />
        <Route path="/license" component={License} />
      </Switch>
      <ToastContainer position="top-center" className="toastify" />
    </div>
  </HashRouter>
);

export default Routes;
