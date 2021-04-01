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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Backdrop, CssBaseline, createMuiTheme, ThemeProvider, useMediaQuery } from '@material-ui/core';
import './App.css';
import { Navbar } from './components/Navbar/Navbar';
import { MoviesSidebar } from './components/Movies/MoviesSidebar';
import { CharactersSidebar } from './components/Characters/CharactersSidebar';
import { PlanetsSidebar } from './components/Planets/PlanetsSidebar';
import { WelcomeScreen } from './components/WelcomeScreen';
import { LoginPage } from './components/LoginPage';
import { CreateMovieItemScreen } from './components/Movies/CreateMovieItemScreen';
import { NotFoundScreen } from './components/NotFoundScreen';
import { DRAWER_WIDTH } from './constants/sizing-constants';
import { RegistrationPage } from './components/RegistrationPage';
import { Sidebar } from './components/Sidebar';
import { UserSignInStatus } from './store/thunks/auth-thunks';
import { getSignInStatus } from '.';
var useStyles = makeStyles(function (theme) {
    return createStyles({
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: 0,
        },
        drawerHeader: __assign(__assign({ display: 'flex', alignItems: 'center', padding: theme.spacing(0, 1) }, theme.mixins.toolbar), { justifyContent: 'flex-end' }),
        contentShift: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: DRAWER_WIDTH,
        },
        backdrop: {
            zIndex: theme.zIndex.drawer - 1,
            color: '#fff',
            overflow: 'hidden'
        },
    });
});
/** Sidebar state to dispatch to context */
var defaultDrawerContext = {
    open: false,
};
export var DrawerContext = React.createContext(defaultDrawerContext);
export default function App() {
    var _a;
    var materialUIStyles = useStyles();
    var isUserSignedIn = useSelector(function (state) { return state.authState.isUserSignedIn; });
    var isCommonLoadingBackDropOn = useSelector(function (state) { return state.componentsState.isCommonLoadingBckDropOn; });
    /** Drawer (=== Sidebar) state context block */
    var _b = useState(defaultDrawerContext), drawerContextValue = _b[0], setDrawerContext = _b[1];
    /**
     * Function to change the state of the drawer openness
     * It's passed into Navbar component where it's getting it's state (boolean: open or close)
     */
    var changeDrawerState = function (isOpen) {
        setDrawerContext({ open: isOpen });
    };
    /**
     * Getting the status out of the changed context
     * It's passed into <main />'s "open" attribute
     */
    var open = drawerContextValue.open;
    useEffect(function () { return getSignInStatus(); }, []);
    var themingMode = useSelector(function (state) { return state.componentsState.mode; });
    var theme = createMuiTheme({
        palette: {
            type: themingMode ? 'dark' : 'light',
            primary: {
                light: themingMode ? '#484848' : '#757ce8',
                main: themingMode ? '#212121' : '#3f50b5',
                dark: themingMode ? '#000000' : '#002884',
                contrastText: '#fff'
            },
            secondary: {
                light: '#ff7961',
                main: '#f44336',
                dark: '#ba000d',
                contrastText: '#000',
            },
        },
    });
    var areMoviesLoaded = useSelector(function (state) { return state.moviesStore.areMovieEntitiesLoaded; });
    var areCharactersLoaded = useSelector(function (state) { return state.charactersStore.areCharacterEntitiesLoaded; });
    var arePlanetsLoaded = useSelector(function (state) { return state.planetsStore.arePlanetEntitiesLoaded; });
    var location = useLocation();
    var addresses = ['/create-film-entry', 'edit=1', '/login', '/register', '/', '/not-found'];
    var checkAddress = function () { return addresses.includes(location.pathname); };
    var checkStatus = function () {
        if (!(areMoviesLoaded || areCharactersLoaded || arePlanetsLoaded)) {
            return checkAddress();
        }
        return true;
    };
    var _c = useState(checkStatus()), isCanShowMobileSidebar = _c[0], setMobileSidebarStatus = _c[1];
    useEffect(function () {
        setMobileSidebarStatus(checkStatus());
    }, [areMoviesLoaded, areCharactersLoaded, arePlanetsLoaded, location.pathname]);
    var isMediaQueryMatch375 = useMediaQuery('(max-width:414px)');
    var Pending = UserSignInStatus.Pending, Authorised = UserSignInStatus.Authorised;
    return (_jsx("div", __assign({ className: "App" }, { children: _jsx(ThemeProvider, __assign({ theme: theme }, { children: _jsxs(CssBaseline, { children: [_jsxs(DrawerContext.Provider, __assign({ value: drawerContextValue }, { children: [_jsx(Navbar, { setDrawerState: changeDrawerState }, void 0),
                            _jsxs("main", __assign({ className: clsx(materialUIStyles.content, (_a = {},
                                    _a[materialUIStyles.contentShift] = open,
                                    _a)) }, { children: [(isMediaQueryMatch375 && isCanShowMobileSidebar) && _jsx(Sidebar, __assign({ setDrawerState: changeDrawerState }, { children: _jsx("div", {}, void 0) }), void 0),
                                    _jsx("div", { className: materialUIStyles.drawerHeader }, void 0),
                                    _jsx(React.Fragment, { children: _jsxs(Switch, { children: [_jsx(Route, __assign({ path: "/", exact: true }, { children: _jsx(WelcomeScreen, {}, void 0) }), void 0),
                                                _jsx(Route, __assign({ path: "/films/:id?" }, { children: _jsx(MoviesSidebar, { setDrawerState: changeDrawerState }, void 0) }), void 0),
                                                _jsx(Route, __assign({ path: "/people/:id?" }, { children: _jsx(CharactersSidebar, { setDrawerState: changeDrawerState }, void 0) }), void 0),
                                                _jsx(Route, __assign({ path: "/planets/:id?" }, { children: _jsx(PlanetsSidebar, { setDrawerState: changeDrawerState }, void 0) }), void 0),
                                                _jsx(Route, __assign({ path: "/login" }, { children: _jsx(LoginPage, {}, void 0) }), void 0),
                                                _jsx(Route, __assign({ path: "/create-film-entry" }, { children: isUserSignedIn !== Pending && (isUserSignedIn === Authorised ? _jsx(CreateMovieItemScreen, {}, void 0) : _jsx(Redirect, { to: "/login" }, void 0)) }), void 0),
                                                _jsx(Route, __assign({ path: "/not-found" }, { children: _jsx(NotFoundScreen, {}, void 0) }), void 0),
                                                _jsx(Route, __assign({ path: "/register" }, { children: _jsx(RegistrationPage, {}, void 0) }), void 0),
                                                _jsx(Route, __assign({ path: "*" }, { children: _jsx(Redirect, { to: "/not-found" }, void 0) }), void 0)] }, void 0) }, void 0)] }), void 0)] }), void 0),
                    _jsx(Backdrop, { className: materialUIStyles.backdrop, open: isCommonLoadingBackDropOn }, void 0)] }, void 0) }), void 0) }), void 0));
}
