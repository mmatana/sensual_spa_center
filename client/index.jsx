import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import PersistedStore from './PersistedStore';
import App from './components/App.jsx';

ReactDOM.render(
  <Provider store={PersistedStore.getDefaultStore().store}>
    <App />
  </Provider>
  , document.querySelector('#root')
);
