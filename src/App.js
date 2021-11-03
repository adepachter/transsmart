import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Auth0Provider, withAuthenticationRequired } from '@auth0/auth0-react';
import { createBrowserHistory } from 'history';
import Profile from './components/Profile';

import Home from './Home';
import IncomingOrders from './IncomingOrders';
import ListShipments from './Shipments';
import DeleteShip from './DeleteShip';
import NewOrder from './NewOrder';
import InkoPrint from './inkoprint';

import './App.css';

export const history = createBrowserHistory();

const ProtectedRoute = ({ component, ...args }) => (
  <Route component={withAuthenticationRequired(component)} {...args} />
);

const onRedirectCallback = (appState) => {
  // Use the router's history module to replace the url
  history.replace(appState?.returnTo || window.location.pathname);
};
function App() {

  return (

      <Router history={history}>
          <Route exact path="/" component={Home} />
          
          <ProtectedRoute path="/incoming" component={IncomingOrders} />
          <ProtectedRoute path="/shipments" component={ListShipments} />
          <ProtectedRoute path="/delete" component={DeleteShip} />
          <ProtectedRoute path="/addnew" component={NewOrder} />
          <ProtectedRoute path="/inkoprint" component={InkoPrint} />
          
          <ProtectedRoute path="/profile" component={Profile} />
      </Router>

  );
}


export default App;
