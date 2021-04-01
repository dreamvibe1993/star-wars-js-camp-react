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
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import PublicIcon from '@material-ui/icons/Public';
import FaceIcon from '@material-ui/icons/Face';
import MovieIcon from '@material-ui/icons/Movie';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { SearchBar } from '../SearchBar';
import { DrawerContext } from '../../App';
import { DRAWER_WIDTH } from '../../constants/sizing-constants';
import { signCurrentUserOut, UserSignInStatus } from '../../store/thunks/auth-thunks';
var useStyles = makeStyles(function (theme) {
    return createStyles({
        drawer: {
            width: DRAWER_WIDTH,
            flexShrink: 0,
        },
        drawerHeader: __assign(__assign({ display: 'flex', alignItems: 'center', padding: theme.spacing(0, 1) }, theme.mixins.toolbar), { justifyContent: 'flex-end' }),
        drawerPaper: {
            width: DRAWER_WIDTH,
        },
        activeLink: {
            backgroundColor: 'rgba(0,0,0, .1)'
        }
    });
});
/**
 * Component that renders THE sidebar.
 * Children are list of items to render inside.
 */
export var Sidebar = function (_a) {
    var children = _a.children, setDrawerState = _a.setDrawerState;
    var materialUIStyles = useStyles();
    var theme = useTheme();
    var dispatch = useDispatch();
    var open = useContext(DrawerContext).open;
    var isMediaQueryMatch375 = useMediaQuery('(max-width:414px)');
    var isUserSignedIn = useSelector(function (state) { return state.authState.isUserSignedIn; });
    return (_jsxs(Drawer, __assign({ classes: {
            paper: materialUIStyles.drawerPaper,
        }, className: materialUIStyles.drawer, open: open, variant: "persistent" }, { children: [isMediaQueryMatch375 ?
                _jsxs(_Fragment, { children: [_jsx("div", __assign({ className: materialUIStyles.drawerHeader }, { children: _jsx(IconButton, __assign({ onClick: function () {
                                    setDrawerState(false);
                                } }, { children: theme.direction === 'ltr' ? _jsx(ChevronLeftIcon, {}, void 0) : _jsx(ChevronRightIcon, {}, void 0) }), void 0) }), void 0),
                        _jsx(Divider, {}, void 0),
                        _jsxs(List, { children: [_jsxs(ListItem, __assign({ activeClassName: materialUIStyles.activeLink, component: NavLink, to: "/films", button: true }, { children: [_jsx(ListItemIcon, { children: _jsx(MovieIcon, {}, void 0) }, void 0),
                                        _jsx(ListItemText, { primary: 'Movies' }, void 0)] }), void 0),
                                _jsxs(ListItem, __assign({ activeClassName: materialUIStyles.activeLink, component: NavLink, to: "/people", button: true }, { children: [_jsx(ListItemIcon, { children: _jsx(FaceIcon, {}, void 0) }, void 0),
                                        _jsx(ListItemText, { primary: 'Characters' }, void 0)] }), void 0),
                                _jsxs(ListItem, __assign({ activeClassName: materialUIStyles.activeLink, component: NavLink, to: "/planets", button: true }, { children: [_jsx(ListItemIcon, { children: _jsx(PublicIcon, {}, void 0) }, void 0),
                                        _jsx(ListItemText, { primary: 'Planets' }, void 0)] }), void 0),
                                _jsx(Divider, {}, void 0),
                                isUserSignedIn === UserSignInStatus.Authorised
                                    ?
                                        _jsxs(ListItem, __assign({ button: true }, { children: [_jsx(ListItemIcon, { children: _jsx(ExitToAppIcon, {}, void 0) }, void 0),
                                                _jsx(ListItemText, { onClick: function () { return dispatch(signCurrentUserOut()); }, primary: 'Log out' }, void 0)] }), void 0)
                                    :
                                        _jsxs(ListItem, __assign({ component: NavLink, to: "/login", button: true }, { children: [_jsx(ListItemIcon, { children: _jsx(AccountCircleIcon, {}, void 0) }, void 0),
                                                _jsx(ListItemText, { primary: 'Log in' }, void 0)] }), void 0),
                                _jsx(ListItem, { children: _jsx(SearchBar, {}, void 0) }, void 0)] }, void 0),
                        _jsx(Divider, {}, void 0)] }, void 0)
                :
                    _jsx(Toolbar, {}, void 0), children] }), void 0));
};
