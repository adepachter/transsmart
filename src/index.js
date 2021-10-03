import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Container from 'react-bootstrap/container';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './NavBar';
import { BrowserRouter } from 'react-router-dom';
import Context from './Context';
// Import Duet Date Picker
import { defineCustomElements } from "@duetds/date-picker/dist/loader";

// Register Duet Date Picker
defineCustomElements(window);


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <NavBar />
      <Container>
        
      <App />
      
      </Container>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
