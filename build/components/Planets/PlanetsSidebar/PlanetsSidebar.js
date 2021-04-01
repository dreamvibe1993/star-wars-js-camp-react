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
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { Backdrop, CircularProgress, createStyles, List, ListItem, ListItemText, makeStyles } from '@material-ui/core';
import { WelcomeScreen } from '../../WelcomeScreen';
import { Sidebar } from '../../Sidebar';
import { PlanetsItemScreen } from '../PlanetsItemScreen';
import styles from './PlanetsSidebar.module.css';
import { NAVBAR_HEIGHT, ITEM_HEIGHT } from '../../../constants/sizing-constants';
import { movieSidebarSnapshotTeardown } from '../../../store/thunks/movies-thunks';
import { setNumberOfItemsDisplayPlanets, addItemsToDisplayPlanets, lazyloadMorePlanets, discardPlanetsItemsAmmount } from '../../../store/thunks/planets-thunks';
var useStyles = makeStyles(function (theme) {
    return createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
            position: "absolute"
        },
        activeLink: {
            backgroundColor: 'rgba(0,0,0, .1)'
        }
    });
});
/** Sidebar (or a drawer) where the planets items are displayed */
export var PlanetsSidebar = function (_a) {
    var setDrawerState = _a.setDrawerState;
    var materialUIStyles = useStyles();
    var dispatch = useDispatch();
    var queryParams = useParams();
    /** Variable to check if there's a planet item */
    var planet = useSelector(function (state) { return state.planetsStore.planetItem; });
    /** Variable to check if there's any planets loaded */
    var planets = useSelector(function (state) { return state.planetsStore.planets; });
    var isSidebarLoading = useSelector(function (state) { return state.componentsState.isSidebarLoading; });
    var numberOfItemsToDisplay = useSelector(function (state) { return state.planetsStore.itemsToDispPlanets; });
    var listItems = planets.map(function (planetItem) { return (_jsx(ListItem, __assign({ activeClassName: materialUIStyles.activeLink, component: NavLink, to: "/planets/" + planetItem.docId, button: true }, { children: _jsx(ListItemText, { primary: planetItem.name }, void 0) }), planetItem.docId)); });
    useEffect(function () {
        if (movieSidebarSnapshotTeardown) {
            movieSidebarSnapshotTeardown();
        }
    }, [movieSidebarSnapshotTeardown]);
    /** If a window size was changed rerenders planets items into the sidebar */
    function getAmountOfItemsPerWindowSize() {
        var ammount = Math.ceil((window.innerHeight - NAVBAR_HEIGHT) / ITEM_HEIGHT);
        dispatch(setNumberOfItemsDisplayPlanets(ammount));
    }
    /** When the component's loaded loads first batch of planets items and does so if the num of the items' changed */
    useEffect(function () {
        getAmountOfItemsPerWindowSize();
        if (numberOfItemsToDisplay === 1) {
            dispatch(addItemsToDisplayPlanets());
        }
        dispatch(lazyloadMorePlanets(numberOfItemsToDisplay));
    }, [numberOfItemsToDisplay]);
    /** Triggers recalculating of ammounts of planets items to display if the size of the window's changed */
    window.addEventListener('resize', function () { return dispatch(discardPlanetsItemsAmmount()); });
    /** Reference to get scroll event */
    var scrollRef = useRef(null);
    /** Hook that gets a scroll event and loads more items */
    useEffect(function () {
        if (!scrollRef.current) {
            return;
        }
        var divListContainer = scrollRef.current;
        divListContainer.addEventListener('scroll', function () {
            var scrollBottom = divListContainer.scrollHeight - divListContainer.scrollTop - divListContainer.clientHeight;
            if (!scrollBottom) {
                dispatch(addItemsToDisplayPlanets());
            }
        });
    }, [dispatch]);
    return (_jsxs(_Fragment, { children: [_jsx(Sidebar, __assign({ setDrawerState: setDrawerState }, { children: _jsxs("div", __assign({ ref: scrollRef, className: styles.drawerContainer }, { children: [_jsx(List, { children: listItems }, void 0),
                        _jsx(Backdrop, __assign({ className: materialUIStyles.backdrop, open: isSidebarLoading }, { children: _jsx(CircularProgress, { color: "inherit" }, void 0) }), void 0)] }), void 0) }), void 0),
            _jsx("div", { children: (planet || queryParams.id) ? _jsx(PlanetsItemScreen, {}, void 0) : _jsx(WelcomeScreen, {}, void 0) }, void 0)] }, void 0));
};
