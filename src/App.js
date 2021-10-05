import React from 'react';
import './App.css';
import ListShipments from './Shipments';
import Home from './Home';
import { Route, Switch } from 'react-router-dom';
import DeleteShip from './DeleteShip';
import IncomingOrders from './IncomingOrders';
import NewOrder from './NewOrder';
import InkoPrint from './inkoprint';
import Login from './Login';
import { useAuth0 } from '@auth0/auth0-react';



function App() {
  const { user, isAuthenticated } = useAuth0();
  return (
    <>
    {isAuthenticated && (
    <main>
      <Switch>
        
        <Route path="/incoming" component={IncomingOrders} />
        <Route path="/shipments" component={ListShipments} />
        <Route path="/delete" component={DeleteShip} />
        <Route path="/addnew" component={NewOrder} />
        <Route path="/inkoprint" component={InkoPrint} />
        <Route path="/login" component={Login} />
      </Switch>
    </main>
    )}
    <main>
    <Switch>
        <Route path="/" component={Home} exact />
    </Switch>
    </main>
    </>
  );
}


export default App;
