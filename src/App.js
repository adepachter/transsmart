import React from 'react';
import './App.css';
import ListShipments from './Shipments';
import Home from './Home';
import { Route, Switch } from 'react-router-dom';
import DeleteShip from './DeleteShip';



function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/shipments" component={ListShipments} />
        <Route path="/delete" component={DeleteShip} />
      </Switch>
    </main>
  );
}

export default App;
