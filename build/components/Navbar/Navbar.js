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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Switch from '@material-ui/core/Switch';
import { IconButton, useMediaQuery } from '@material-ui/core';
import { MenuIcon } from '@material-ui/data-grid';
import { DrawerContext } from '../../App';
import { Logo } from '../../imgs/logo';
import { DRAWER_WIDTH } from '../../constants/sizing-constants';
import styles from './Navbar.module.css';
import { SearchBar } from '../SearchBar';
import { UserSignInStatus, signCurrentUserOut } from '../../store/thunks/auth-thunks';
import { setThemingMode, setCommonBackdropOn, setCommonBackdropOff } from '../../store/thunks/components-thunks';
var useStyles = makeStyles(function (theme) {
    return createStyles({
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            zIndex: theme.zIndex.drawer + 1,
        },
        appBarShift: {
            width: "calc(100% - " + DRAWER_WIDTH + "px)",
            marginLeft: DRAWER_WIDTH,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        hide: {
            display: 'none',
        },
    });
});
/**
 * Component that renders navbar with: films/people/planets tabs, mainlogo, searchinput and login button-link.
 * It also switches the sidebar open and emits the main screen shrinking.
 */
export var Navbar = function (_a) {
    var _b;
    var setDrawerState = _a.setDrawerState;
    var history = useHistory();
    var dispatch = useDispatch();
    var _c = useState(false), value = _c[0], setValue = _c[1];
    var location = useLocation();
    var redirectLink = useSelector(function (state) { return state.moviesStore.redirectLink; });
    useEffect(function () {
        if (redirectLink) {
            history.push(redirectLink);
        }
    }, [redirectLink]);
    /** Hook that checks an url and sets the slider accordingly */
    useEffect(function () {
        if (location.pathname.includes('/films')) {
            setValue(0);
            setDrawerState(true);
        }
        else if (location.pathname.includes('/people')) {
            setValue(1);
            setDrawerState(true);
        }
        else if (location.pathname.includes('/planets')) {
            setValue(2);
            setDrawerState(true);
        }
        else {
            setValue(false);
            setDrawerState(false);
        }
    }, [location.pathname]);
    /** Function that and sets the slider accordingly */
    var setSliderPosition = function (event, newValue) {
        setDrawerState(true);
        setValue(newValue);
    };
    var materialUIStyles = useStyles();
    function a11yProps(index) {
        return {
            id: "simple-tab-" + index,
            'aria-controls': "simple-tabpanel-" + index,
        };
    }
    var isUserSignedIn = useSelector(function (state) { return state.authState.isUserSignedIn; });
    var _d = React.useState(true), toggler = _d[0], setToggler = _d[1];
    var handleChange = function (event) {
        setToggler(event.target.checked);
        dispatch(setThemingMode(event.target.checked));
    };
    var themingMode = useSelector(function (state) { return state.componentsState.mode; });
    var open = useContext(DrawerContext).open;
    var isMediaQueryMatch375 = useMediaQuery('(max-width:414px)');
    useEffect(function () {
        if (open && isMediaQueryMatch375) {
            dispatch(setCommonBackdropOn());
        }
        else {
            dispatch(setCommonBackdropOff());
        }
    }, [open, isMediaQueryMatch375]);
    var appbarPersistentMode = clsx(materialUIStyles.appBar, (_b = {}, _b[materialUIStyles.appBarShift] = open, _b));
    var appbarPermanentMode = clsx(materialUIStyles.appBar);
    return (_jsx(AppBar, __assign({ className: isMediaQueryMatch375 ? appbarPersistentMode : appbarPermanentMode, position: "fixed" }, { children: _jsxs(Toolbar, { children: [!isMediaQueryMatch375 ?
                    _jsxs(Tabs, __assign({ "aria-label": "simple tabs", onChange: setSliderPosition, value: value }, { children: [_jsx(Tab, __assign({ component: NavLink, label: "Films", to: "/films" }, a11yProps(0)), void 0),
                            _jsx(Tab, __assign({ component: NavLink, label: "Characters", to: "/people" }, a11yProps(1)), void 0),
                            _jsx(Tab, __assign({ component: NavLink, label: "Planets", to: "/planets" }, a11yProps(2)), void 0)] }), void 0)
                    :
                        _jsx(IconButton, __assign({ "aria-label": "open drawer", className: clsx(materialUIStyles.menuButton, open && materialUIStyles.hide), color: "inherit", edge: "start", onClick: function () {
                                setDrawerState(true);
                                // history.push('/films') 
                            } }, { children: _jsx(MenuIcon, {}, void 0) }), void 0),
                _jsx(Typography, __assign({ className: styles.title, variant: "h6" }, { children: _jsx(Link, __assign({ className: styles.cancelLinkStyles, to: "/" }, { children: _jsx(Logo, { color: themingMode ? '#fff200' : '#fff' }, void 0) }), void 0) }), void 0),
                _jsx("div", { children: _jsx(Switch, { checked: toggler, inputProps: { 'aria-label': 'secondary checkbox' }, name: "themingToggler", onChange: handleChange }, void 0) }, void 0),
                !isMediaQueryMatch375 &&
                    _jsxs(_Fragment, { children: [_jsx(SearchBar, {}, void 0),
                            isUserSignedIn === UserSignInStatus.Authorised
                                ? _jsx(Button, __assign({ color: "inherit", onClick: function () { return dispatch(signCurrentUserOut()); } }, { children: "Logout" }), void 0)
                                : _jsx(Button, __assign({ color: "inherit", onClick: function () { return history.push('/login'); } }, { children: "Login" }), void 0)] }, void 0)] }, void 0) }), void 0));
};
