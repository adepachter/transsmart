import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBarNav from './NavBar';
import { BrowserRouter } from 'react-router-dom';
// Import Duet Date Picker
import { defineCustomElements } from "@duetds/date-picker/dist/loader";
import { Auth0Provider } from '@auth0/auth0-react';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

// Register Duet Date Picker
defineCustomElements(window);


ReactDOM.render(
    <BrowserRouter>
      <NavBarNav />
  <Auth0Provider
  domain={domain}
  clientId={clientId}
  redirectUri={window.location.origin}
>
      <Container>
      
      <App />
      
      </Container>
  </Auth0Provider>,
    </BrowserRouter>
  document.getElementById('root')
);
