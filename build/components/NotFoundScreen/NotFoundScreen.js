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
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardActionArea, CardContent, CardMedia, createStyles, makeStyles, Typography } from '@material-ui/core';
import { setMovieLoadingPending } from '../../store/thunks/movies-thunks';
var useStyles = makeStyles(function (theme) {
    return createStyles({
        spacing: {
            padding: theme.spacing(5)
        },
        media: {
            height: 600,
        }
    });
});
/** Component that renders only if no entry is found */
export var NotFoundScreen = function () {
    var classes = useStyles();
    var dispatch = useDispatch();
    useEffect(function () {
        dispatch(setMovieLoadingPending(true));
    }, []);
    return (_jsx(_Fragment, { children: _jsx(Card, { children: _jsxs(CardActionArea, { children: [_jsx(CardMedia, { className: classes.media, image: 'https://img1.looper.com/img/gallery/the-saddest-star-wars-moments-ever/intro-1584389780.jpg', title: "BOOOOHOOOOOOOOO!!!!!!! :*O" }, void 0),
                    _jsxs(CardContent, { children: [_jsx(Typography, __assign({ variant: "h2", gutterBottom: true }, { children: "404!" }), void 0),
                            _jsx(Typography, __assign({ color: "textSecondary", component: "p", variant: "body2" }, { children: "Should we try again?" }), void 0)] }, void 0)] }, void 0) }, void 0) }, void 0));
};
