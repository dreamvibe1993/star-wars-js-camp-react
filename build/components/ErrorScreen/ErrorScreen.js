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
import { createStyles, makeStyles, Paper, Typography } from '@material-ui/core';
var useStyles = makeStyles(function (theme) {
    return createStyles({
        spacing: {
            padding: theme.spacing(5)
        }
    });
});
/** Screen to be shown if there was any error caught */
export var ErrorScreen = function (_a) {
    var error = _a.error;
    var classes = useStyles();
    return (_jsx(_Fragment, { children: _jsxs(Paper, __assign({ className: classes.spacing }, { children: [_jsx(Typography, __assign({ component: "h2", variant: "h3", gutterBottom: true }, { children: "Sorry, something went wrong!" }), void 0),
                _jsx(Typography, __assign({ variant: "body1", gutterBottom: true }, { children: "Error message:" }), void 0),
                _jsx("hr", {}, void 0),
                _jsxs(Typography, __assign({ variant: "h6", gutterBottom: true }, { children: ["\"", error.message, "\""] }), void 0),
                _jsx("hr", {}, void 0),
                _jsxs(Typography, __assign({ variant: "body1", gutterBottom: true }, { children: ["Please, ", _jsx("a", __assign({ href: "https://t.me/GEORGIY_APRAKSIN" }, { children: "contact me" }), void 0), " and cite the message above."] }), void 0),
                _jsx(Typography, __assign({ variant: "h6", gutterBottom: true }, { children: "Thank You!" }), void 0)] }), void 0) }, void 0));
};
