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
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { makeStyles, createStyles, fade, InputBase } from '@material-ui/core';
import { SearchIcon } from '@material-ui/data-grid';
import { NavbarSearchYupValScheme } from '../../models/yup-validation-schemas';
import { searchMovieEntry } from '../../store/thunks/movies-thunks';
var useStyles = makeStyles(function (theme) {
    var _a, _b;
    return createStyles({
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        search: (_a = {
                position: 'relative',
                borderRadius: theme.shape.borderRadius,
                backgroundColor: fade(theme.palette.common.white, 0.15),
                '&:hover': {
                    backgroundColor: fade(theme.palette.common.white, 0.25),
                },
                marginLeft: 0,
                width: '100%'
            },
            _a[theme.breakpoints.up('sm')] = {
                marginLeft: theme.spacing(1),
                width: 'auto',
            },
            _a),
        inputInput: (_b = {
                padding: theme.spacing(1, 1, 1, 0),
                paddingLeft: "calc(1em + " + theme.spacing(4) + "px)",
                transition: theme.transitions.create('width'),
                width: '100%'
            },
            _b[theme.breakpoints.up('sm')] = {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
            _b),
        inputRoot: {
            color: 'inherit',
        },
    });
});
var validationSchema = NavbarSearchYupValScheme;
export var SearchBar = function () {
    var materialUIStyles = useStyles();
    var dispatch = useDispatch();
    var formik = useFormik({
        initialValues: {
            title: '',
        },
        validationSchema: validationSchema,
        onSubmit: function (values) {
            dispatch(searchMovieEntry(values.title));
        }
    });
    return (_jsx("form", __assign({ onSubmit: formik.handleSubmit }, { children: _jsxs("div", __assign({ className: materialUIStyles.search }, { children: [_jsx("div", __assign({ className: materialUIStyles.searchIcon }, { children: _jsx(SearchIcon, {}, void 0) }), void 0),
                _jsx(InputBase, { classes: {
                        root: materialUIStyles.inputRoot,
                        input: materialUIStyles.inputInput,
                    }, inputProps: { 'aria-label': 'search' }, name: "title", onChange: formik.handleChange, placeholder: "Search..." }, void 0)] }), void 0) }), void 0));
};
