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
import { Link, Redirect, useHistory, useLocation, useParams } from 'react-router-dom';
import { Accordion, AccordionDetails, AccordionSummary, Button, CardActionArea, CardActions, CardContent, CardMedia, CircularProgress, createStyles, Grid, makeStyles, Paper, Typography, Card } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { MovieItemEditForm } from './MovieItemEditForm';
import { MovieItemDisplayComponent } from './MovieItemDisplayComponent';
import { UserSignInStatus } from '../../../store/thunks/auth-thunks';
import { loadMovieItem } from '../../../store/thunks/movies-thunks';
var useStyles = makeStyles(function (theme) {
    var _a, _b, _c;
    return createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 300,
            maxWidth: 600,
        },
        deleteButton: {
            marginRight: '15px'
        },
        spinnerContainer: (_a = {
                width: '100%',
                minHeight: "550px",
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            },
            _a[theme.breakpoints.down('sm')] = {
                minWidth: '300px',
            },
            _a),
        grid: {
            flexGrow: 1,
            backgroundColor: 'rgb(0,0,0,.05)',
            borderRadius: '5px',
        },
        gridItem: (_b = {},
            _b[theme.breakpoints.down('sm')] = {
                width: 150
            },
            _b),
        media: {
            height: 200,
        },
        jsxAccorderons: (_c = {
                width: '100%',
                marginTop: '15px'
            },
            _c[theme.breakpoints.down('sm')] = {
                minWidth: '300px',
            },
            _c)
    });
});
/** Component that renders a chosen movie's data */
export var MovieItemScreen = function () {
    var materialUIStyles = useStyles();
    var history = useHistory();
    var dispatch = useDispatch();
    var location = useLocation();
    /** Variable to check if a user's logged in */
    var isUserSignedIn = useSelector(function (state) { return state.authState.isUserSignedIn; });
    /** Variable to check if there's any relevant planets */
    var relevantPlanets = useSelector(function (state) { return state.moviesStore.relevantPlanets; });
    /** Variable to check if there's any relevant characters */
    var relevantCharacters = useSelector(function (state) { return state.moviesStore.relevantCharacters; });
    var queryParam = useParams();
    var queries = new URLSearchParams(location.search);
    /** Query in case of a user decides to edit an entry */
    var edit = queries.get('edit');
    var movie = useSelector(function (state) { return state.moviesStore.movieItem; });
    var isMovieLoadingPending = useSelector(function (state) { return state.moviesStore.isMovieLoadingPending; });
    /** If a user got back from another tab pastes an ID of a current entry */
    useEffect(function () {
        if (movie && movie.docId && !queryParam.id) {
            history.replace("/films/" + movie.docId);
        }
        dispatch(loadMovieItem(queryParam.id));
    }, [queryParam.id]);
    if (isMovieLoadingPending) {
        return (_jsx(_Fragment, { children: _jsx(Paper, __assign({ className: materialUIStyles.spinnerContainer }, { children: _jsx(CircularProgress, { color: "inherit" }, void 0) }), void 0) }, void 0));
    }
    /** if there's no movie item show nothing */
    if (!movie && !isMovieLoadingPending) {
        return _jsx(Redirect, { to: "/not-found" }, void 0);
    }
    /** If a user decides to see an info about a relevant character pastes a link of such */
    function renderCharacInfo(charID) {
        history.push("/people/" + charID);
    }
    /** If a user decides to see an info about a relevant planet pastes a link of such */
    function renderPlanetInfo(planetID) {
        history.push("/planets/" + planetID);
    }
    var relevantCharactersJSX = (_jsxs(Accordion, __assign({ className: materialUIStyles.jsxAccorderons }, { children: [_jsx(AccordionSummary, __assign({ "aria-controls": "panel1a-content", expandIcon: _jsx(ExpandMoreIcon, {}, void 0), id: "panel1a-header" }, { children: _jsx(Typography, __assign({ align: 'center', variant: "h6", gutterBottom: true }, { children: "LIST OF THE MOVIE CHARACTERS" }), void 0) }), void 0),
            _jsx(AccordionDetails, { children: _jsx(Grid, __assign({ className: materialUIStyles.grid, spacing: 2, container: true }, { children: relevantCharacters && relevantCharacters.map(function (character) { return (_jsx(Grid, __assign({ className: materialUIStyles.gridItem, onClick: function () { return renderCharacInfo(character.docId); }, xs: "auto", item: true }, { children: _jsxs(Card, { children: [_jsxs(CardActionArea, { children: [_jsx(CardMedia, { className: materialUIStyles.media, image: character.image || 'https://via.placeholder.com/200x300?text=No+image', title: character.name }, void 0),
                                        _jsxs(CardContent, { children: [_jsx(Typography, __assign({ component: "h2", variant: "h5", gutterBottom: true }, { children: character.name }), void 0),
                                                _jsxs(Typography, __assign({ color: "textSecondary", component: "p", variant: "body2" }, { children: ["Color of the eyes: ", character.eyeColor] }), void 0)] }, void 0)] }, void 0),
                                _jsx(CardActions, __assign({ style: { display: 'flex', justifyContent: 'space-around' } }, { children: _jsx(Button, __assign({ color: "inherit", size: "small" }, { children: "Learn More" }), void 0) }), void 0)] }, void 0) }), character.docId)); }) }), void 0) }, void 0)] }), void 0));
    var relevantPlanetsJSX = (_jsxs(Accordion, __assign({ className: materialUIStyles.jsxAccorderons }, { children: [_jsx(AccordionSummary, __assign({ "aria-controls": "panel1a-content", expandIcon: _jsx(ExpandMoreIcon, {}, void 0), id: "panel1a-header" }, { children: _jsx(Typography, __assign({ align: 'center', variant: "h6", gutterBottom: true }, { children: "LIST OF THE MOVIE PLANETS" }), void 0) }), void 0),
            _jsx(AccordionDetails, { children: _jsx(Grid, __assign({ className: materialUIStyles.grid, spacing: 2, container: true }, { children: relevantPlanets && relevantPlanets.map(function (planet) { return (_jsx(Grid, __assign({ className: materialUIStyles.gridItem, onClick: function () { return renderPlanetInfo(planet.docId); }, xs: "auto", item: true }, { children: _jsxs(Card, { children: [_jsxs(CardActionArea, { children: [_jsx(CardMedia, { className: materialUIStyles.media, image: planet.img || 'https://via.placeholder.com/200x300?text=No+image', title: planet.name }, void 0),
                                        _jsxs(CardContent, { children: [_jsx(Typography, __assign({ component: "h2", variant: "h5", gutterBottom: true }, { children: planet.name }), void 0),
                                                _jsxs(Typography, __assign({ color: "textSecondary", component: "p", variant: "body2" }, { children: ["Diameter: ", planet.diameter] }), void 0)] }, void 0)] }, void 0),
                                _jsx(CardActions, __assign({ style: { display: 'flex', justifyContent: 'space-around' } }, { children: _jsx(Button, __assign({ color: "inherit", size: "small" }, { children: "Learn More" }), void 0) }), void 0)] }, void 0) }), planet.docId)); }) }), void 0) }, void 0)] }), void 0));
    var relevantEntitiesBlock = (relevantPlanets || relevantCharacters) && (_jsxs(_Fragment, { children: [relevantCharacters && relevantCharactersJSX, relevantPlanets && relevantPlanetsJSX] }, void 0));
    if (isUserSignedIn === UserSignInStatus.Unauthorised && edit) {
        return (_jsxs(_Fragment, { children: [_jsx("h3", { children: "Only logged users can edit entries" }, void 0),
                _jsx(Link, __assign({ style: { color: 'red' }, to: "/login" }, { children: "Login" }), void 0)] }, void 0));
    }
    if (edit && movie) {
        return _jsx(MovieItemEditForm, { movie: movie }, void 0);
    }
    if (!edit && movie) {
        return _jsx(MovieItemDisplayComponent, { movie: movie, relevantEntitiesBlock: relevantEntitiesBlock }, void 0);
    }
    return null;
};
