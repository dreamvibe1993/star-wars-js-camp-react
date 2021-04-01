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
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { useFormik } from 'formik';
import { Button, Chip, CircularProgress, createStyles, FormControl, Input, InputLabel, makeStyles, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableRow, TextField, useMediaQuery, useTheme } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { ITEM_HEIGHT, ITEM_PADDING_TOP } from '../../../constants/sizing-constants';
import styles from './CreateMovieItemScreen.module.css';
import { createMovieItemYupValScheme } from '../../../models/yup-validation-schemas';
import { addMovieEntry, loadDataToAddWhenCreating } from '../../../store/thunks/movies-thunks';
import { movieDTOMapper } from '../../../api/mappers/mapper';
var useStyles = makeStyles(function (theme) {
    var _a;
    return createStyles({
        root: {
            '& > *': (_a = {
                    margin: theme.spacing(1)
                },
                _a[theme.breakpoints.down('sm')] = {
                    margin: theme.spacing(0),
                },
                _a),
        },
        formControl: {
            margin: theme.spacing(1),
            width: '100%'
        },
        cancelButton: {
            marginRight: '10px',
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
var validationSchema = createMovieItemYupValScheme;
var initialValues = {
    title: '',
    producer: '',
    releaseDate: '',
    director: '',
    openingCrawl: '',
    charactersPKs: [],
    planetsPKs: [],
    created: '',
    edited: '',
    episodeId: 0,
    speciesPKs: [],
    starshipsPKs: [],
    vehiclesPKs: [],
    pk: 0,
    docId: '',
    img: '',
};
var MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
function getStyles(name, characterNames, theme) {
    return {
        fontWeight: characterNames.indexOf(name) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
    };
}
/** Component that provides an interface to create a movie entry */
export var CreateMovieItemScreen = function () {
    var theme = useTheme();
    var dispatch = useDispatch();
    /** Styles that are more superior than module.css */
    var materialUIStyles = useStyles();
    /** Characters to choose to add into a new movie entry */
    var characters = useSelector(function (state) { return state.charactersStore.characters; });
    /** Planets to choose to add into a new movie entry */
    var planets = useSelector(function (state) { return state.planetsStore.planets; });
    var areEntitiesLoading = useSelector(function (state) { return state.moviesStore.areEntitiesLoading; });
    /** State for chosen characters to be added */
    var _a = React.useState([]), characterNames = _a[0], setCharacterNames = _a[1];
    /** State for chosen planets to be added */
    var _b = React.useState([]), planetNames = _b[0], setPlanetNames = _b[1];
    /**
     * Adds names of chosen characters
     *
     * @param event Change event of a node
     */
    var handleChangeCharacters = function (event) {
        setCharacterNames(event.target.value);
    };
    /**
     * Adds names of chosen planets to state
     *
     * @param event Change event of a node
     */
    var handleChangePlanets = function (event) {
        setPlanetNames(event.target.value);
    };
    /** Loads Characters and Planets when first time launched */
    useEffect(function () {
        dispatch(loadDataToAddWhenCreating());
    }, []);
    var formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: function (values) {
            dispatch(addMovieEntry(__assign({}, movieDTOMapper(values, 0))));
        }
    });
    /** Refreshes personal keys array when a new character is chosen */
    useEffect(function () {
        var charactersCollection = characters.filter(function (character) { return characterNames.find(function (name) { return name === character.name; }); });
        var charactersPersonalKeys = charactersCollection.map(function (character) { return character.pk; });
        formik.setFieldValue('charactersPKs', charactersPersonalKeys);
    }, [characterNames]);
    /** Refreshes personal keys array when a new planet is chosen */
    useEffect(function () {
        var planetsFiltered = planets.filter(function (planet) { return planetNames.find(function (name) { return name === planet.name; }); });
        var planetsPersonalKeys = planetsFiltered.map(function (planet) { return planet.pk; });
        formik.setFieldValue('planetsPKs', planetsPersonalKeys);
    }, [planetNames]);
    var isEntityBeingAdded = useSelector(function (state) { return state.moviesStore.isEntityBeingAdded; });
    var isMediaQueryMatch375 = useMediaQuery('(max-width:414px)');
    if (isEntityBeingAdded) {
        return _jsx(Redirect, { to: "/films" }, void 0);
    }
    return (_jsx(_Fragment, { children: _jsx("div", __assign({ className: materialUIStyles.root }, { children: _jsx("form", __assign({ onSubmit: formik.handleSubmit }, { children: _jsx(TableContainer, __assign({ component: Paper }, { children: _jsx(Table, __assign({ size: "medium" }, { children: _jsxs(TableBody, { children: [_jsxs(TableRow, { children: [_jsx(TableCell, __assign({ align: "left", className: styles.tenthWidth }, { children: _jsx("strong", { children: "Title: " }, void 0) }), void 0),
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
                                _jsxs(TableRow, { children: [_jsx(TableCell, __assign({ align: "left", className: styles.tenthWidth }, { children: _jsx("strong", { children: "Relevant characters and planets: " }, void 0) }), void 0),
                                        !areEntitiesLoading ?
                                            _jsxs(TableCell, { children: [_jsxs(FormControl, __assign({ className: materialUIStyles.formControl }, { children: [_jsx(InputLabel, __assign({ id: "mutiple-chip-label" }, { children: "Characters to add" }), void 0),
                                                            _jsx(Select, __assign({ id: "select-characters-to-add", input: _jsx(Input, { id: "select-characters-to-add" }, void 0), labelId: "select-characters-to-add-label", MenuProps: MenuProps, onChange: handleChangeCharacters, renderValue: function (selected) { return (_jsx("div", __assign({ className: styles.chips }, { children: selected.map(function (value) { return (_jsx(Chip, { className: styles.chip, label: value }, value)); }) }), void 0)); }, value: characterNames, multiple: true }, { children: characters.map(function (character) { return (_jsx(MenuItem, __assign({ style: getStyles(character.name, characterNames, theme), value: character.name }, { children: character.name }), character.name)); }) }), void 0)] }), void 0),
                                                    _jsxs(FormControl, __assign({ className: materialUIStyles.formControl }, { children: [_jsx(InputLabel, __assign({ id: "mutiple-chip-label" }, { children: "Planets to add" }), void 0),
                                                            _jsx(Select, __assign({ id: "select-planets-to-add", input: _jsx(Input, { id: "select-planets-to-add" }, void 0), labelId: "select-planets-to-add-label", MenuProps: MenuProps, onChange: handleChangePlanets, renderValue: function (selected) { return (_jsx("div", __assign({ className: styles.chips }, { children: selected.map(function (value) { return (_jsx(Chip, { className: styles.chip, label: value }, value)); }) }), void 0)); }, value: planetNames, multiple: true }, { children: planets.map(function (planet) { return (_jsx(MenuItem, __assign({ style: getStyles(planet.name, planetNames, theme), value: planet.name }, { children: planet.name }), planet.name)); }) }), void 0)] }), void 0)] }, void 0)
                                            :
                                                _jsx(TableCell, __assign({ className: materialUIStyles.spinnerContainer }, { children: _jsx(CircularProgress, {}, void 0) }), void 0)] }, void 0),
                                _jsx(TableRow, {}, void 0),
                                _jsxs(TableRow, { children: [_jsx(TableCell, { align: "left" }, void 0),
                                        _jsxs(TableCell, __assign({ align: "right" }, { children: [_jsx(Link, __assign({ className: styles.link, to: "/films" }, { children: _jsx(Button, __assign({ className: materialUIStyles.cancelButton, color: "primary", type: "button", variant: "contained" }, { children: "CANCEL" }), void 0) }), void 0),
                                                _jsx(Button, __assign({ color: "primary", type: "submit", variant: "contained" }, { children: "SAVE" }), void 0)] }), void 0)] }, void 0)] }, void 0) }), void 0) }), void 0) }), void 0) }), void 0) }, void 0));
};
