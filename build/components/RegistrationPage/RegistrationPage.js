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
import { useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { makeStyles, createStyles, Paper, TextField, Button, Typography } from '@material-ui/core';
import { DRAWER_WIDTH } from '../../constants/sizing-constants';
import styles from './RegistrationPage.module.css';
import { accCreateYupValScheme } from '../../models/yup-validation-schemas';
import { createUserAccount, UserSignInStatus } from '../../store/thunks/auth-thunks';
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
        spacing: {
            margin: theme.spacing(2),
        },
        media: {
            height: 400,
        },
        modalAlike: {
            width: '330px',
            margin: '0 auto',
        }
    });
});
var validationSchema = accCreateYupValScheme;
export var RegistrationPage = function () {
    var materialUIStyles = useStyles();
    var dispatch = useDispatch();
    var isUserAuthorized = useSelector(function (state) { return state.authState.isUserSignedIn; });
    var emailErrorMessage = useSelector(function (state) { return state.authState.emailErrorCodeMsg; });
    var formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            repeatPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: function (values) {
            if (values.password !== values.repeatPassword) {
                formik.setFieldError('password', 'Passwords don\'t match!');
            }
            else {
                dispatch(createUserAccount({ email: values.email, password: values.password }));
            }
        },
    });
    useEffect(function () {
        if (emailErrorMessage) {
            formik.setFieldError('email', emailErrorMessage);
        }
    }, [emailErrorMessage]);
    if (isUserAuthorized === UserSignInStatus.Authorised) {
        return _jsx(Redirect, { to: "/login" }, void 0);
    }
    return (_jsxs("form", __assign({ className: materialUIStyles.modalAlike, onSubmit: formik.handleSubmit }, { children: [_jsxs(Paper, __assign({ className: styles.flexColumn }, { children: [_jsx(Typography, __assign({ component: "h2", style: { marginTop: '15px' }, variant: "h4" }, { children: "Create an account" }), void 0),
                    _jsx(TextField, { className: materialUIStyles.spacing, error: formik.touched.email && Boolean(formik.errors.email), helperText: formik.touched.email && formik.errors.email, id: "email", label: "Type your email", name: "email", onChange: formik.handleChange, value: formik.values.email, variant: "outlined" }, void 0),
                    _jsx(TextField, { className: materialUIStyles.spacing, error: formik.touched.password && Boolean(formik.errors.password), helperText: formik.touched.password && formik.errors.password, id: "password", label: "Type your password", name: "password", onChange: formik.handleChange, type: "password", value: formik.values.password, variant: "outlined" }, void 0),
                    _jsx(TextField, { className: materialUIStyles.spacing, error: formik.touched.repeatPassword && Boolean(formik.errors.repeatPassword), helperText: formik.touched.repeatPassword && formik.errors.repeatPassword, id: "repeatPassword", label: "Repeat your password", name: "repeatPassword", onChange: formik.handleChange, type: "password", value: formik.values.repeatPassword, variant: "outlined" }, void 0),
                    _jsx(Button, __assign({ className: materialUIStyles.spacing, color: "primary", type: "submit", variant: "contained" }, { children: "Submit" }), void 0)] }), void 0),
            _jsxs(Typography, __assign({ color: "textSecondary", variant: "subtitle1" }, { children: ["Already have an account? ", _jsx(NavLink, __assign({ style: { color: "red" }, to: "/login" }, { children: "Log in!" }), void 0)] }), void 0)] }), void 0));
};
