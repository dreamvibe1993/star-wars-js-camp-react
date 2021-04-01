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
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Checkbox, createStyles, FormControl, Input, InputLabel, ListItemText, makeStyles, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableRow, TextField, useMediaQuery } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { movieEditYupValScheme } from '../../../../models/yup-validation-schemas';
import { ITEM_HEIGHT, ITEM_PADDING_TOP } from '../../../../constants/sizing-constants';
import styles from './MovieItemEditForm.module.css';
import { movieDTOMapper } from '../../../../api/mappers/mapper';
import { editMovieEntry, loadDataToAddWhenCreating, setRelevChars, setRelevPlanets } from '../../../../store/thunks/movies-thunks';
import { UserSignInStatus } from '../../../../store/thunks/auth-thunks';
var useStyles = makeStyles(function (theme) {
    var _a, _b;
    return createStyles({
        root: {
            '& > *': (_a = {
                    margin: theme.spacing(1)
                },
                _a[theme.breakpoints.down('xs')] = {
                    margin: theme.spacing(0),
                },
                _a),
        },
        cancelButton: {
            marginRight: "10px",
        },
        formControl: (_b = {
                margin: theme.spacing(1),
                width: '100%'
            },
            _b[theme.breakpoints.down('xs')] = {
                margin: theme.spacing(0),
                minWidth: 120,
                maxWidth: 180,
            },
            _b),
        loseWrap: {
            whiteSpace: 'normal'
        },
        spinnerContainer: {
            width: '100%',
            minHeight: "100px",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
    });
});
var validationSchema = movieEditYupValScheme;
/**
 * Function that returns an op. crawl without line breakages
 *
 * @param openingCrawl Text that follows before every sw movie.
 */
function getRidOfLineBreaks(openingCrawl) {
    return openingCrawl.replace(/[\n\r]+/gm, ' ');
}
var MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 100,
        },
    },
};
/** Component that renders an interface for an entry editing */
export var MovieItemEditForm = function (_a) {
    var movie = _a.movie;
    var history = useHistory();
    var materialUIStyles = useStyles();
    var dispatch = useDispatch();
    var _b = React.useState([]), characterNames = _b[0], setCharacterNames = _b[1];
    var _c = React.useState([]), planetsNames = _c[0], setPlanetsNames = _c[1];
    var relevantCharacters = useSelector(function (state) { return state.moviesStore.relevantCharacters; });
    var relevantPlanets = useSelector(function (state) { return state.moviesStore.relevantPlanets; });
    var charsCollection = useSelector(function (state) { return state.charactersStore.characters; });
    var planetsCollection = useSelector(function (state) { return state.planetsStore.planets; });
    var _d = React.useState(relevantCharacters), newRelevantCharacters = _d[0], setNewRelevantCharacters = _d[1];
    var _e = React.useState(relevantPlanets), newRelevantPlanets = _e[0], setNewRelevantPlanets = _e[1];
    useEffect(function () {
        dispatch(loadDataToAddWhenCreating());
    }, []);
    /** Variable to check if a user's logged in */
    var isUserSignedIn = useSelector(function (state) { return state.authState.isUserSignedIn; });
    var formik = useFormik({
        initialValues: {
            title: movie.title,
            producer: movie.producer,
            releaseDate: movie.releaseDate,
            director: movie.director,
            openingCrawl: getRidOfLineBreaks(movie.openingCrawl),
            charactersPKs: movie.charactersPKs,
            planetsPKs: movie.planetsPKs,
            created: movie.created,
            edited: movie.edited,
            episodeId: movie.episodeId,
            speciesPKs: movie.speciesPKs,
            starshipsPKs: movie.starshipsPKs,
            vehiclesPKs: movie.vehiclesPKs,
            pk: movie.pk,
            docId: movie.docId,
            img: movie.img
        },
        validationSchema: validationSchema,
        onSubmit: function (values) {
            var movieDTO = movieDTOMapper(values, movie.pk);
            dispatch(editMovieEntry({ MovieDTO: movieDTO, docID: values.docId }));
            dispatch(setRelevPlanets(newRelevantPlanets));
            dispatch(setRelevChars(newRelevantCharacters));
            history.goBack();
        },
    });
    var handleChangeCharacters = function (event) {
        setCharacterNames(event.target.value);
    };
    var handleChangePlanets = function (event) {
        setPlanetsNames(event.target.value);
    };
    useEffect(function () {
        if (relevantCharacters) {
            var names = relevantCharacters.map(function (char) { return char.name; });
            setCharacterNames(names);
        }
        if (relevantPlanets) {
            var names = relevantPlanets.map(function (planet) { return planet.name; });
            setPlanetsNames(names);
        }
    }, [relevantCharacters, relevantPlanets]);
    useEffect(function () {
        var characters = charsCollection && charsCollection.filter(function (character) { return characterNames.find(function (name) { return name === character.name; }); });
        var charactersPersonalKeys = characters.map(function (character) { return character.pk; });
        if (characters.length === 0) {
            setNewRelevantCharacters(null);
        }
        else {
            setNewRelevantCharacters(characters);
        }
        formik.setFieldValue('charactersPKs', charactersPersonalKeys);
    }, [characterNames, charsCollection]);
    useEffect(function () {
        var planets = planetsCollection && planetsCollection.filter(function (planet) { return planetsNames.find(function (name) { return name === planet.name; }); });
        var planetsPersonalKeys = planets.map(function (planet) { return planet.pk; });
        if (planets.length === 0) {
            setNewRelevantPlanets(null);
        }
        else {
            setNewRelevantPlanets(planets);
        }
        formik.setFieldValue('planetsPKs', planetsPersonalKeys);
    }, [planetsNames, planetsCollection]);
    var isMediaQueryMatch375 = useMediaQuery('(max-width:414px)');
    return (_jsx(_Fragment, { children: _jsx("div", __assign({ className: materialUIStyles.root }, { children: _jsxs("form", __assign({ onSubmit: formik.handleSubmit }, { children: [_jsx(TableContainer, __assign({ component: Paper }, { children: _jsx(Table, __assign({ size: "medium" }, { children: _jsxs(TableBody, { children: [_jsxs(TableRow, { children: [_jsx(TableCell, __assign({ align: "left", className: styles.tenthWidth }, { children: _jsx("strong", { children: "Title: " }, void 0) }), void 0),
                                            _jsx(TableCell, { children: _jsx(TextField, { error: formik.touched.title && Boolean(formik.errors.title), helperText: formik.touched.title && formik.errors.title, name: "title", onChange: formik.handleChange, size: isMediaQueryMatch375 ? 'small' : 'medium', value: formik.values.title, variant: "outlined", fullWidth: true }, void 0) }, void 0)] }, void 0),
                                    _jsxs(TableRow, { children: [_jsx(TableCell, __assign({ align: "left", className: styles.tenthWidth }, { children: _jsx("strong", { children: "Producer: " }, void 0) }), void 0),
                                            _jsx(TableCell, { children: _jsx(TextField, { error: formik.touched.producer && Boolean(formik.errors.producer), helperText: formik.touched.producer && formik.errors.producer, name: "producer", onChange: formik.handleChange, size: isMediaQueryMatch375 ? 'small' : 'medium', value: formik.values.producer, variant: "outlined", fullWidth: true }, void 0) }, void 0)] }, void 0),
                                    _jsxs(TableRow, { children: [_jsx(TableCell, __assign({ align: "left", className: styles.tenthWidth }, { children: _jsx("strong", { children: "Release date: " }, void 0) }), void 0),
                                            _jsx(TableCell, { children: _jsx(TextField, { error: formik.touched.releaseDate && Boolean(formik.errors.releaseDate), helperText: formik.touched.releaseDate && formik.errors.releaseDate, name: "releaseDate", onChange: formik.handleChange, size: isMediaQueryMatch375 ? 'small' : 'medium', type: "date", value: formik.values.releaseDate, variant: "outlined", fullWidth: true }, void 0) }, void 0)] }, void 0),
                                    _jsxs(TableRow, { children: [_jsx(TableCell, __assign({ align: "left", className: styles.tenthWidth }, { children: _jsx("strong", { children: "Director: " }, void 0) }), void 0),
                                            _jsx(TableCell, { children: _jsx(TextField, { error: formik.touched.director && Boolean(formik.errors.director), helperText: formik.touched.director && formik.errors.director, name: "director", onChange: formik.handleChange, size: isMediaQueryMatch375 ? 'small' : 'medium', value: formik.values.director, variant: "outlined", fullWidth: true }, void 0) }, void 0)] }, void 0),
                                    _jsxs(TableRow, { children: [_jsx(TableCell, __assign({ align: "left", className: styles.tenthWidth }, { children: _jsx("strong", { children: "Opening crawl: " }, void 0) }), void 0),
                                            _jsx(TableCell, { children: _jsx(TextField, { error: formik.touched.openingCrawl && Boolean(formik.errors.openingCrawl), helperText: formik.touched.openingCrawl && formik.errors.openingCrawl, name: "openingCrawl", onChange: formik.handleChange, size: isMediaQueryMatch375 ? 'small' : 'medium', value: formik.values.openingCrawl, variant: "outlined", fullWidth: true, multiline: true }, void 0) }, void 0)] }, void 0),
                                    _jsxs(TableRow, { children: [_jsx(TableCell, __assign({ align: "left", className: styles.tenthWidth }, { children: _jsx("strong", { children: "Img link: " }, void 0) }), void 0),
                                            _jsx(TableCell, { children: _jsx(TextField, { name: "img", onChange: formik.handleChange, size: isMediaQueryMatch375 ? 'small' : 'medium', value: formik.values.img, variant: "outlined", fullWidth: true, multiline: true }, void 0) }, void 0)] }, void 0),
                                    _jsxs(TableRow, { children: [_jsx(TableCell, __assign({ align: "left", className: styles.tenthWidth }, { children: _jsx("strong", { children: "Characters: " }, void 0) }), void 0),
                                            _jsx(TableCell, { children: _jsxs(FormControl, __assign({ className: materialUIStyles.formControl }, { children: [_jsx(InputLabel, __assign({ id: "characters" }, { children: "Add or remove" }), void 0),
                                                        _jsx(Select, __assign({ id: "characters", input: _jsx(Input, {}, void 0), labelId: "characters", MenuProps: MenuProps, onChange: handleChangeCharacters, renderValue: function (selected) { return selected.join(', '); }, value: characterNames, multiple: true }, { children: charsCollection && charsCollection.map(function (char) { return (_jsxs(MenuItem, __assign({ value: char.name }, { children: [_jsx(Checkbox, { checked: characterNames.includes(char.name) }, void 0),
                                                                    _jsx(ListItemText, { primary: char.name }, void 0)] }), char.docId)); }) }), void 0)] }), void 0) }, void 0)] }, void 0),
                                    _jsxs(TableRow, { children: [_jsx(TableCell, __assign({ align: "left", className: styles.tenthWidth }, { children: _jsx("strong", { children: "Planets: " }, void 0) }), void 0),
                                            _jsx(TableCell, { children: _jsxs(FormControl, __assign({ className: materialUIStyles.formControl }, { children: [_jsx(InputLabel, __assign({ id: "planets" }, { children: "Add or remove" }), void 0),
                                                        _jsx(Select, __assign({ id: "planets", input: _jsx(Input, {}, void 0), labelId: "planets", MenuProps: MenuProps, onChange: handleChangePlanets, renderValue: function (selected) { return selected.join(', '); }, value: planetsNames, multiple: true }, { children: planetsCollection && planetsCollection.map(function (planet) { return (_jsxs(MenuItem, __assign({ value: planet.name }, { children: [_jsx(Checkbox, { checked: planetsNames.includes(planet.name) }, void 0),
                                                                    _jsx(ListItemText, { primary: planet.name }, void 0)] }), planet.docId)); }) }), void 0)] }), void 0) }, void 0)] }, void 0)] }, void 0) }), void 0) }), void 0),
                    isUserSignedIn === UserSignInStatus.Authorised &&
                        _jsxs("div", __assign({ className: styles.buttonContainer }, { children: [_jsx(Button, __assign({ className: materialUIStyles.cancelButton, color: "primary", onClick: function () { return history.goBack(); }, type: "button", variant: "contained" }, { children: "CANCEL" }), void 0),
                                _jsx(Button, __assign({ color: "primary", type: "submit", variant: "contained" }, { children: "SAVE" }), void 0)] }), void 0)] }), void 0) }), void 0) }, void 0));
};
