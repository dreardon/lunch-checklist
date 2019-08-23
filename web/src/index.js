import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './components/App';
import './components/assets/vendor/bootstrap/css/bootstrap.min.css';
import './components/assets/site/status.css';
import './components/assets/site/status.js';
import $ from "jquery"

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'));

$(document).ready(function(){
  $("#foodFilter").on("keyup", function() {
  var value = $(this).val().toLowerCase();
  $("#menuData tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
  });
  })
});