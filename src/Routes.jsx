import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Dashboard from './scenes/Dashboard';

const Routes = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        {/* <Route path="/dashboard" component={LicenseHOC(Dashboard)} />
        <Route path="/license" component={License} />
        <Route exact path="/" component={LicencseHOC(Dashboard)} />
        <Route path="*" component={NotFound} /> */}
      </Switch>
      <ToastContainer position="top-center" className="toastify" />
    </div>
  </BrowserRouter>
);

export default Routes;
