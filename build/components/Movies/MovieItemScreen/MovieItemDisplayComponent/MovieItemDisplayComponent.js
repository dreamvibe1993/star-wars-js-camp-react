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
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Card, CardActionArea, CardMedia, createStyles, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core';
import { DeletionConfirmationModal } from '../../DeletionConfirmationModal';
import styles from '../MovieItemScreen.module.css';
import { UserSignInStatus } from '../../../../store/thunks/auth-thunks';
import { setDeletionModalOpen } from '../../../../store/thunks/components-thunks';
var useStyles = makeStyles(function (theme) {
    var _a, _b;
    return createStyles({
        deleteButton: {
            marginRight: '15px'
        },
        tableContainer: (_a = {
                display: 'flex'
            },
            _a[theme.breakpoints.down('sm')] = {
                flexDirection: 'column',
                minWidth: '300px',
            },
            _a),
        imgContainer: {
            height: '450px',
            width: '450px',
            margin: '5px',
            backgroundPosition: 'left',
            backgroundSize: '70%',
        },
        card: {
            width: 'auto',
            maxHeight: '600px',
            maxWidth: '350px',
            height: 'auto',
            boxShadow: 'none'
        },
        buttonTableCell: (_b = {
                borderBottom: 'none'
            },
            _b[theme.breakpoints.down('sm')] = {
                width: '500px'
            },
            _b),
    });
});
/**
 * Component to display a movie data.
 *
 * @param movie Movie entity object to display
 * @param relevantEntitiesBlock JSX Element to display relevant entities.
 */
export var MovieItemDisplayComponent = function (_a) {
    var movie = _a.movie, relevantEntitiesBlock = _a.relevantEntitiesBlock;
    var materialUIStyles = useStyles();
    var isUserSignedIn = useSelector(function (state) { return state.authState.isUserSignedIn; });
    var dispatch = useDispatch();
    var history = useHistory();
    /** If a user decides to edit an entry pastes an ID of an entry to edit */
    function pushEditQueryToURL() {
        history.push({
            pathname: "/films/" + movie.docId,
            search: "edit=1",
        });
    }
    return (_jsxs(_Fragment, { children: [_jsx(DeletionConfirmationModal, { movieID: movie.docId }, void 0),
            _jsxs("div", { children: [_jsxs(TableContainer, __assign({ className: materialUIStyles.tableContainer, component: Paper }, { children: [_jsx(Card, __assign({ className: materialUIStyles.card }, { children: _jsx(CardActionArea, { children: _jsx(CardMedia, { className: materialUIStyles.imgContainer, image: movie.img || 'https://via.placeholder.com/728x1000?text=No+image', title: movie.title }, void 0) }, void 0) }), void 0),
                            _jsx(Table, __assign({ className: styles.table, size: "medium" }, { children: _jsxs(TableBody, { children: [_jsxs(TableRow, { children: [_jsx(TableCell, __assign({ align: "left" }, { children: _jsx("strong", { children: "Title: " }, void 0) }), void 0),
                                                _jsx(TableCell, __assign({ align: "center" }, { children: _jsx("h1", { children: movie.title }, void 0) }), void 0)] }, void 0),
                                        _jsxs(TableRow, { children: [_jsx(TableCell, __assign({ align: "left" }, { children: _jsx("strong", { children: "Producer: " }, void 0) }), void 0),
                                                _jsx(TableCell, __assign({ align: "center" }, { children: movie.producer }), void 0)] }, void 0),
                                        _jsxs(TableRow, { children: [_jsx(TableCell, __assign({ align: "left" }, { children: _jsx("strong", { children: "Release date: " }, void 0) }), void 0),
                                                _jsx(TableCell, __assign({ align: "center" }, { children: movie.releaseDate }), void 0)] }, void 0),
                                        _jsxs(TableRow, { children: [_jsx(TableCell, __assign({ align: "left" }, { children: _jsx("strong", { children: "Director: " }, void 0) }), void 0),
                                                _jsx(TableCell, __assign({ align: "center" }, { children: movie.director }), void 0)] }, void 0),
                                        _jsxs(TableRow, { children: [_jsx(TableCell, __assign({ align: "left" }, { children: _jsx("strong", { children: "Opening crawl: " }, void 0) }), void 0),
                                                _jsx(TableCell, __assign({ align: "center" }, { children: movie.openingCrawl }), void 0)] }, void 0),
                                        _jsxs(TableRow, { children: [_jsx(TableCell, { style: { borderBottom: 'none' } }, void 0),
                                                _jsx(TableCell, __assign({ align: "right", className: materialUIStyles.buttonTableCell }, { children: isUserSignedIn === UserSignInStatus.Authorised &&
                                                        _jsxs("div", { children: [_jsx(Button, __assign({ className: materialUIStyles.deleteButton, color: "primary", onClick: function () { return dispatch(setDeletionModalOpen()); }, type: "button", variant: "contained" }, { children: "DELETE" }), void 0),
                                                                _jsx(Button, __assign({ color: "primary", onClick: function () { return pushEditQueryToURL(); }, type: "button", variant: "contained" }, { children: "EDIT" }), void 0)] }, void 0) }), void 0)] }, void 0)] }, void 0) }), void 0)] }), void 0), relevantEntitiesBlock] }, void 0)] }, void 0));
};
