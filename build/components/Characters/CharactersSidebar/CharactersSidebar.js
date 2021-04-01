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
import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { Backdrop, createStyles, List, ListItemText, makeStyles, ListItem } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { WelcomeScreen } from '../../WelcomeScreen';
import { Sidebar } from '../../Sidebar';
import { CharacterItemScreen } from '../CharacterItemScreen';
import { NAVBAR_HEIGHT, ITEM_HEIGHT } from '../../../constants/sizing-constants';
import { addItemsToDisplayCharacters, discardCharactersItemsAmmount, lazyloadMoreCharacters, setNumberOfItemsDisplayCharacters } from '../../../store/thunks/characters-thunks';
import { movieSidebarSnapshotTeardown } from '../../../store/thunks/movies-thunks';
var useStyles = makeStyles(function (theme) {
    return createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
            position: 'absolute'
        },
        activeLink: {
            backgroundColor: 'rgba(0,0,0, .1)'
        },
        drawerContainer: {
            overflow: 'auto'
        }
    });
});
/** Sidebar (or drawer) where the people items are displayed */
export var CharactersSidebar = function (_a) {
    var setDrawerState = _a.setDrawerState;
    var materialUIStyles = useStyles();
    /** Variable to check if there's a person item */
    var character = useSelector(function (state) { return state.charactersStore.characterItem; });
    /** Variable to check if there's any people loaded */
    var characters = useSelector(function (state) { return state.charactersStore.characters; });
    var isSidebarLoading = useSelector(function (state) { return state.componentsState.isSidebarLoading; });
    var numberOfItemsToDisplay = useSelector(function (state) { return state.charactersStore.itemsToDispCharacters; });
    var queryParams = useParams();
    var dispatch = useDispatch();
    useEffect(function () {
        if (movieSidebarSnapshotTeardown) {
            movieSidebarSnapshotTeardown();
        }
    }, [movieSidebarSnapshotTeardown]);
    var listItems = useMemo(function () { return characters.map(function (characterItem) { return (_jsx(ListItem, __assign({ activeClassName: materialUIStyles.activeLink, component: NavLink, to: "/people/" + characterItem.docId, button: true }, { children: _jsx(ListItemText, { primary: characterItem.name }, void 0) }), characterItem.docId)); }); }, [characters]);
    /** If a window size was changed rerenders people items into the sidebar */
    function getAmountOfItemsPerWindowSize() {
        var ammount = Math.ceil((window.innerHeight - NAVBAR_HEIGHT) / ITEM_HEIGHT);
        dispatch(setNumberOfItemsDisplayCharacters(ammount));
    }
    /** When the component's loaded loads first batch of people items and does so if the num of the items' changed */
    useEffect(function () {
        getAmountOfItemsPerWindowSize();
        if (numberOfItemsToDisplay === 1) {
            dispatch(addItemsToDisplayCharacters());
        }
        dispatch(lazyloadMoreCharacters(numberOfItemsToDisplay));
    }, [numberOfItemsToDisplay]);
    /** Triggers recalculating of ammounts of people items to display if the size of the window's changed */
    window.addEventListener('resize', function () { return dispatch(discardCharactersItemsAmmount()); });
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
                dispatch(addItemsToDisplayCharacters());
            }
        });
    }, [dispatch]);
    return (_jsxs(_Fragment, { children: [_jsx(Sidebar, __assign({ setDrawerState: setDrawerState }, { children: _jsxs("div", __assign({ ref: scrollRef, className: materialUIStyles.drawerContainer }, { children: [_jsx(List, { children: listItems }, void 0),
                        _jsx(Backdrop, __assign({ className: materialUIStyles.backdrop, open: isSidebarLoading }, { children: _jsx(CircularProgress, { color: "inherit" }, void 0) }), void 0)] }), void 0) }), void 0),
            (queryParams.id || character) ? _jsx(CharacterItemScreen, {}, void 0) : _jsx(WelcomeScreen, {}, void 0)] }, void 0));
};
