import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import UserLogin from './UserLogin';
import Dashboard from './Dashboard';

export default function Routes() {
  return (<BrowserRouter>
    <Switch>
      <Route path="/" exact component={UserLogin} />
      <Route path="/dashboard" component={Dashboard} />
    </Switch>
  </BrowserRouter>)
}
