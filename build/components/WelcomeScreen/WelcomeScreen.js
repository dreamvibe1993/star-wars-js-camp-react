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
import React from 'react';
import { Backdrop, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, createStyles, Fade, makeStyles, Modal, Typography, useMediaQuery } from '@material-ui/core';
import { YellowLogo } from '../../imgs/logo';
var useStyles = makeStyles(function (theme) {
    return createStyles({
        spacing: {
            padding: theme.spacing(5)
        },
        media: {
            height: 500,
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            '& a': {
                color: 'red'
            },
        },
    });
});
/** Welcoming default screen. Rendered while nothing is chosen yet. */
export var WelcomeScreen = function () {
    var _a = React.useState(false), open = _a[0], setOpen = _a[1];
    var materialUIStyles = useStyles();
    var handleOpen = function () {
        setOpen(true);
    };
    var handleClose = function () {
        setOpen(false);
    };
    var isMediaQueryMatch375 = useMediaQuery('(max-width:414px)');
    return (_jsxs(_Fragment, { children: [_jsx("div", { children: _jsx(Modal, __assign({ "aria-describedby": "transition-modal-description", "aria-labelledby": "transition-modal-title", BackdropComponent: Backdrop, BackdropProps: {
                        timeout: 500,
                    }, className: materialUIStyles.modal, onClose: handleClose, open: open, closeAfterTransition: true }, { children: _jsx(Fade, __assign({ in: open }, { children: _jsxs("div", __assign({ className: materialUIStyles.paper }, { children: [_jsx(Typography, __assign({ variant: "h4" }, { children: "Psst..." }), void 0),
                                _jsx(Typography, { children: "Hello there!" }, void 0),
                                _jsxs(Typography, __assign({ component: "p", variant: "body2" }, { children: ["My name is ", _jsx("a", __assign({ href: "https://t.me/GEORGIY_APRAKSIN" }, { children: "George" }), void 0), "\uD83D\uDE0A", _jsx("br", {}, void 0), "This app was made during my internship in ", _jsx("a", __assign({ href: "https://www.interesnee.ru/" }, { children: "INTERESNEE JS WINTER CAMP 2021" }), void 0), "."] }), void 0),
                                _jsx(Typography, { children: "Stack:" }, void 0),
                                _jsxs("ul", { children: [_jsx("li", { children: _jsx("a", __assign({ href: "https://www.typescriptlang.org/" }, { children: "TypeScript" }), void 0) }, void 0),
                                        _jsx("li", { children: _jsx("a", __assign({ href: "https://ru.reactjs.org/" }, { children: "React 17.0.2" }), void 0) }, void 0),
                                        _jsx("li", { children: _jsx("a", __assign({ href: "https://redux-toolkit.js.org/" }, { children: "Redux-Toolkit" }), void 0) }, void 0),
                                        _jsx("li", { children: _jsx("a", __assign({ href: "https://material-ui.com/" }, { children: "Material-UI" }), void 0) }, void 0),
                                        _jsx("li", { children: _jsx("a", __assign({ href: "https://firebase.google.com/docs/firestore" }, { children: "Cloud Firestore" }), void 0) }, void 0),
                                        _jsx("li", { children: _jsx("a", __assign({ href: "https://formik.org/docs/overview" }, { children: "Formik & Yup" }), void 0) }, void 0)] }, void 0),
                                _jsx(Typography, __assign({ component: "p", variant: "body2" }, { children: "My other portfolio and whatnots:" }), void 0),
                                _jsxs("ul", { children: [_jsx("li", { children: _jsx("a", __assign({ href: "https://github.com/dreamvibe1993" }, { children: "Git Hub" }), void 0) }, void 0),
                                        _jsx("li", { children: _jsx("a", __assign({ href: "https://soundcloud.com/mister-dreamvibe" }, { children: "SoundCloud" }), void 0) }, void 0)] }, void 0),
                                _jsxs(Typography, { children: [_jsx("a", __assign({ href: "https://ekaterinburg.hh.ru/resume/416ea42dff089785ce0039ed1f345831765647" }, { children: "Hire me" }), void 0), "\uD83E\uDD29"] }, void 0)] }), void 0) }), void 0) }), void 0) }, void 0),
            _jsxs(Card, { children: [_jsxs(CardActionArea, { children: [_jsx(CardMedia, { className: materialUIStyles.media, image: "https://static0.srcdn.com/wordpress/wp-content/uploads/2019/05/Star-Wars-Movies.jpg?q=50&fit=crop&w=960&h=500", title: "Welcome" }, void 0),
                            _jsx(CardContent, { children: _jsx(YellowLogo, { height: isMediaQueryMatch375 ? "70%" : "40%", width: isMediaQueryMatch375 ? "70%" : "40%" }, void 0) }, void 0)] }, void 0),
                    _jsx(CardActions, { children: _jsx(Button, __assign({ color: "inherit", onClick: handleOpen, size: "small" }, { children: "About" }), void 0) }, void 0)] }, void 0)] }, void 0));
};
