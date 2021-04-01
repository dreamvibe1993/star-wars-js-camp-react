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
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { createStyles, Divider, List, ListItem, ListItemText, makeStyles, } from '@material-ui/core';
import { MovieItemScreen } from '../MovieItemScreen';
import { WelcomeScreen } from '../../WelcomeScreen';
import { Sidebar } from '../../Sidebar';
import styles from './MoviesSidebar.module.css';
import { UserSignInStatus } from '../../../store/thunks/auth-thunks';
import { subscribeToMovies } from '../../../store/thunks/movies-thunks';
var useStyles = makeStyles(function () {
    return createStyles({
        activeLink: {
            backgroundColor: 'rgba(0,0,0, .1)'
        }
    });
});
/** Sidebar (or drawer) where the movie items are displayed */
export var MoviesSidebar = function (_a) {
    var setDrawerState = _a.setDrawerState;
    var materialUIStyles = useStyles();
    var dispatch = useDispatch();
    var queryParams = useParams();
    /** Variable to check if there's any movies */
    var movies = useSelector(function (state) { return state.moviesStore.movies; });
    /** Variable to check if there's a movie item */
    var movieItem = useSelector(function (state) { return state.moviesStore.movieItem; });
    /** Variable to check if a user's logged in */
    var isUserSignedIn = useSelector(function (state) { return state.authState.isUserSignedIn; });
    var listItems = movies.map(function (movie) { return (_jsx(ListItem, __assign({ activeClassName: materialUIStyles.activeLink, component: NavLink, to: "/films/" + movie.docId, button: true }, { children: _jsx(ListItemText, { primary: movie.title }, void 0) }), movie.docId)); });
    /** Hook that triggers movies loading */
    useEffect(function () {
        dispatch(subscribeToMovies());
    }, []);
    var createEntryButton = (_jsxs(_Fragment, { children: [_jsx(Divider, {}, void 0),
            _jsx(ListItem, __assign({ component: NavLink, to: "/create-film-entry", button: true, divider: true }, { children: _jsx(ListItemText, { primary: "Create an entry" }, void 0) }), void 0)] }, void 0));
    return (_jsxs(_Fragment, { children: [_jsx(Sidebar, __assign({ setDrawerState: setDrawerState }, { children: _jsx("div", __assign({ className: styles.drawerContainer }, { children: _jsxs(List, { children: [listItems, isUserSignedIn === UserSignInStatus.Authorised && createEntryButton] }, void 0) }), void 0) }), void 0),
            (movieItem || queryParams.id) ? _jsx(MovieItemScreen, {}, void 0) : _jsx(WelcomeScreen, {}, void 0)] }, void 0));
};
