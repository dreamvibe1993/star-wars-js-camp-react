var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ErrorScreen } from './components/ErrorScreen';
import { firebaseApp } from './api/firebase';
import { store } from './store/thunks/store';
import { signUserIn, setUserEmailString, signUserOut } from './store/thunks/auth-thunks';
/** Sidebar state to dispatch to context */
var sidebar = {
    open: false,
    toggleOpen: function () { this.open = true; },
    toggleClose: function () { this.open = false; },
};
function ErrorFallback(_a) {
    var error = _a.error, resetErrorBoundary = _a.resetErrorBoundary;
    return (_jsx(ErrorScreen, { error: error }, void 0));
}
/** Checking if user is signed in or out. */
export var getSignInStatus = function () { return firebaseApp.auth().onAuthStateChanged(function (user) {
    // the observer is only triggered on sign-in or sign-out.
    if (user) {
        store.dispatch(signUserIn());
        store.dispatch(setUserEmailString(user.email));
    }
    else {
        store.dispatch(signUserOut());
        store.dispatch(setUserEmailString(null));
    }
}); };
export var isDrawerOpen = React.createContext(sidebar);
ReactDOM.render(_jsx(ErrorBoundary, __assign({ FallbackComponent: ErrorFallback }, { children: _jsx(Provider, __assign({ store: store }, { children: _jsx(BrowserRouter, { children: _jsx(App, {}, void 0) }, void 0) }), void 0) }), void 0), document.getElementById('root'));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
