import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './store/reducer';

/** Sidebar state to dispatch to context */
const sidebar = {
  open: false,
  toggleOpen() { this.open = true },
  toggleClose() { this.open = false },
}

export const isDrawerOpen = React.createContext(sidebar);
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
