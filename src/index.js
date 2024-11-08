import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './Store';
import { Provider } from 'react-redux';

//rendering the React app into the DOM
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}> 
      <App />
    </Provider>
  </BrowserRouter>,
  //rendering into the DOM element with the ID 'root'
  document.getElementById('root')
);

//registering the service worker to enable offline functionality and caching
serviceWorker.register();