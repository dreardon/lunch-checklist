import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './components/App';
import './components/assets/vendor/bootstrap/css/bootstrap.min.css';
import './components/assets/site/status.css';
import './components/assets/site/status.js';


ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'));