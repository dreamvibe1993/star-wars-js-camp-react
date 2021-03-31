import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import firebase from "firebase/app";

import { App } from './App';

import reportWebVitals from './reportWebVitals';
import { ErrorScreen } from './components/ErrorScreen';
import { firebaseApp } from './api/firebase';
import { store } from './store/thunks/store';

import { signUserIn, setUserEmailString, signUserOut } from './store/thunks/auth-thunks';


/** Sidebar state to dispatch to context */
const sidebar = {
  open: false,
  toggleOpen() { this.open = true },
  toggleClose() { this.open = false },
}

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <ErrorScreen error={error} />
  )
}

/** Checking if user is signed in or out. */
export const getSignInStatus = (): firebase.Unsubscribe => firebaseApp.auth().onAuthStateChanged((user) => {
  // the observer is only triggered on sign-in or sign-out.
  if (user) {
    store.dispatch(signUserIn());
    store.dispatch(setUserEmailString(user.email))
  } else {
    store.dispatch(signUserOut());
    store.dispatch(setUserEmailString(null))
  }
})


export const isDrawerOpen = React.createContext(sidebar);
ReactDOM.render(
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ErrorBoundary>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
