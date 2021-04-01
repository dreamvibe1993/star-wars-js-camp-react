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
/* eslint-disable react/no-unescaped-entities */
import { useEffect } from 'react';
import { useFormik } from 'formik';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, createStyles, makeStyles, Paper, Typography } from '@material-ui/core';
import { loginPageYupValScheme } from '../../models/yup-validation-schemas';
import { DRAWER_WIDTH } from '../../constants/sizing-constants';
import { signCurrentUserOut, signIn, UserSignInStatus } from '../../store/thunks/auth-thunks';
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
        flexColumn: {
            display: 'flex',
            flexDirection: 'column',
        },
        modalAlike: {
            width: '295px',
            margin: '0 auto',
        }
    });
});
var validationSchema = loginPageYupValScheme;
/** Login page interface */
export var LoginPage = function () {
    var materialUIStyles = useStyles();
    var dispatch = useDispatch();
    var formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: function (values) {
            dispatch(signIn({ email: values.email, password: values.password }));
        },
    });
    var isUserAuthorized = useSelector(function (state) { return state.authState.isUserSignedIn; });
    var userEmail = useSelector(function (state) { return state.authState.userEmail; });
    var passwordErrorMessage = useSelector(function (state) { return state.authState.passwordErrorCodeMsg; });
    var emailErrorMessage = useSelector(function (state) { return state.authState.emailErrorCodeMsg; });
    useEffect(function () {
        if (passwordErrorMessage) {
            formik.setFieldError('password', passwordErrorMessage);
        }
        if (emailErrorMessage) {
            formik.setFieldError('email', emailErrorMessage);
        }
    }, [passwordErrorMessage, emailErrorMessage]);
    if (isUserAuthorized === UserSignInStatus.Authorised) {
        return (_jsx("div", __assign({ className: materialUIStyles.modalAlike }, { children: _jsxs(Card, { children: [_jsxs(CardActionArea, { children: [_jsx(CardMedia, { className: materialUIStyles.media, image: 'https://i.pinimg.com/736x/66/51/fb/6651fbdbd1891d94bb29ba120c8d315c.jpg', title: "Welcome" }, void 0),
                            _jsxs(CardContent, { children: [_jsxs(Typography, __assign({ component: "h2", variant: "h5", gutterBottom: true }, { children: ["Welcome ", userEmail, "!"] }), void 0),
                                    _jsx(Typography, __assign({ color: "textSecondary", component: "p", variant: "body2" }, { children: "We are glad to meet you." }), void 0)] }, void 0)] }, void 0),
                    _jsx(CardActions, __assign({ style: { display: 'flex', justifyContent: 'space-around' } }, { children: _jsx(Button, __assign({ color: "inherit", onClick: function () { return dispatch(signCurrentUserOut()); }, size: "small" }, { children: "Log out" }), void 0) }), void 0)] }, void 0) }), void 0));
    }
    return (_jsx(Container, { children: _jsxs("form", __assign({ className: materialUIStyles.modalAlike, onSubmit: formik.handleSubmit }, { children: [_jsxs(Paper, __assign({ className: materialUIStyles.flexColumn }, { children: [_jsx(TextField, { className: materialUIStyles.spacing, error: formik.touched.email && Boolean(formik.errors.email), helperText: formik.touched.email && formik.errors.email, id: "email", label: "Email", name: "email", onChange: formik.handleChange, value: formik.values.email, variant: "outlined" }, void 0),
                        _jsx(TextField, { className: materialUIStyles.spacing, error: formik.touched.password && Boolean(formik.errors.password), helperText: formik.touched.password && formik.errors.password, id: "password", label: "Password", name: "password", onChange: formik.handleChange, type: "password", value: formik.values.password, variant: "outlined" }, void 0),
                        _jsx(Button, __assign({ className: materialUIStyles.spacing, color: "primary", type: "submit", variant: "contained" }, { children: "Submit" }), void 0)] }), void 0),
                _jsxs(Typography, __assign({ color: "textSecondary", variant: "subtitle1" }, { children: ["Don't have an account yet? ", _jsx(NavLink, __assign({ style: { color: "red" }, to: "/register" }, { children: "Create an account!" }), void 0)] }), void 0)] }), void 0) }, void 0)
    // </div>
    );
};
