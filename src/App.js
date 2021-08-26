import React from 'react';
import './App.css';
import ListShipments from './Shipments';
import Home from './Home';
import { Route, Switch } from 'react-router-dom';
import DeleteShip from './DeleteShip';
import IncomingOrders from './IncomingOrders';
import NewOrder from './NewOrder';



function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/incoming" component={IncomingOrders} />
        <Route path="/shipments" component={ListShipments} />
        <Route path="/delete" component={DeleteShip} />
        <Route paht="/addnew" component={NewOrder} />
      </Switch>
    </main>
  );
}

export default App;
