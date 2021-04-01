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
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { Card, CardActionArea, CardMedia, createStyles, makeStyles, Table, TableBody, TableCell, TableContainer, TableRow, } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { loadCharacterItem } from '../../../store/thunks/characters-thunks';
var useStyles = makeStyles(function (theme) {
    var _a;
    return createStyles({
        table: {
            width: "100%",
            minHeight: "550px",
            height: "auto",
        },
        tenthWidth: {
            width: "10%",
        },
        tableContainer: (_a = {
                display: 'flex'
            },
            _a[theme.breakpoints.down('sm')] = {
                flexDirection: 'column'
            },
            _a),
        spinnerContainer: {
            width: '100%',
            minHeight: "550px",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
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
    });
});
/** Component that renders a chosen character's data */
export var CharacterItemScreen = function () {
    var materialUIStyles = useStyles();
    var history = useHistory();
    var queryParam = useParams();
    var dispatch = useDispatch();
    /** Variable to check if there's any person item loaded in the store */
    var character = useSelector(function (state) { return state.charactersStore.characterItem; });
    /**  Hook that triggers person's entry loading if there's one existing. */
    useEffect(function () {
        if (character && !queryParam.id) {
            history.replace("/people/" + character.docId);
        }
        dispatch(loadCharacterItem(queryParam.id));
    }, [queryParam.id]);
    var isCharacterLoadingPending = useSelector(function (state) { return state.charactersStore.isCharacterLoadingPending; });
    if (!character && !isCharacterLoadingPending) {
        return _jsx(Redirect, { to: "/not-found" }, void 0);
    }
    if (isCharacterLoadingPending) {
        return (_jsx(_Fragment, { children: _jsx("div", __assign({ className: materialUIStyles.spinnerContainer }, { children: _jsx(CircularProgress, { color: "inherit" }, void 0) }), void 0) }, void 0));
    }
    return character && (_jsxs(TableContainer, __assign({ className: materialUIStyles.tableContainer, component: Paper }, { children: [_jsx(Card, __assign({ className: materialUIStyles.card }, { children: _jsx(CardActionArea, { children: _jsx(CardMedia, { className: materialUIStyles.imgContainer, image: character.image || 'https://via.placeholder.com/728x1000?text=No+image', title: character.name }, void 0) }, void 0) }), void 0),
            _jsx(Table, __assign({ className: materialUIStyles.table, size: "medium" }, { children: _jsxs(TableBody, { children: [_jsxs(TableRow, { children: [_jsx(TableCell, __assign({ align: "left", className: materialUIStyles.tenthWidth }, { children: _jsx("strong", { children: "Name: " }, void 0) }), void 0),
                                _jsx(TableCell, __assign({ align: "center" }, { children: _jsx("h1", { children: character.name }, void 0) }), void 0)] }, void 0),
                        _jsxs(TableRow, { children: [_jsx(TableCell, __assign({ align: "left", className: materialUIStyles.tenthWidth }, { children: _jsx("strong", { children: "Date of the birth: " }, void 0) }), void 0),
                                _jsx(TableCell, __assign({ align: "center" }, { children: character.birthYear }), void 0)] }, void 0),
                        _jsxs(TableRow, { children: [_jsx(TableCell, __assign({ align: "left", className: materialUIStyles.tenthWidth }, { children: _jsx("strong", { children: "Color of the eyes: " }, void 0) }), void 0),
                                _jsx(TableCell, __assign({ align: "center" }, { children: character.eyeColor }), void 0)] }, void 0),
                        _jsxs(TableRow, { children: [_jsx(TableCell, __assign({ align: "left", className: materialUIStyles.tenthWidth }, { children: _jsx("strong", { children: "Sex: " }, void 0) }), void 0),
                                _jsx(TableCell, __assign({ align: "center" }, { children: character.gender }), void 0)] }, void 0),
                        _jsxs(TableRow, { children: [_jsx(TableCell, __assign({ align: "left", className: materialUIStyles.tenthWidth }, { children: _jsx("strong", { children: "Hair color: " }, void 0) }), void 0),
                                _jsx(TableCell, __assign({ align: "center" }, { children: character.hairColor }), void 0)] }, void 0),
                        _jsxs(TableRow, { children: [_jsx(TableCell, __assign({ align: "left", className: materialUIStyles.tenthWidth }, { children: _jsx("strong", { children: "Homeworld: " }, void 0) }), void 0),
                                _jsx(TableCell, __assign({ align: "center" }, { children: character.homeworld }), void 0)] }, void 0),
                        _jsxs(TableRow, { children: [_jsx(TableCell, __assign({ align: "left", className: materialUIStyles.tenthWidth }, { children: _jsx("strong", { children: "Weight: " }, void 0) }), void 0),
                                _jsx(TableCell, __assign({ align: "center" }, { children: character.mass }), void 0)] }, void 0),
                        _jsxs(TableRow, { children: [_jsx(TableCell, __assign({ align: "left", className: materialUIStyles.tenthWidth, style: { borderBottom: 'none' } }, { children: _jsx("strong", { children: "Skincolor: " }, void 0) }), void 0),
                                _jsx(TableCell, __assign({ align: "center", style: { borderBottom: 'none' } }, { children: character.skinColor }), void 0)] }, void 0)] }, void 0) }), void 0)] }), void 0));
};
