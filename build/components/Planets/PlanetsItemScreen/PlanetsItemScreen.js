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
import { CircularProgress, createStyles, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableRow, } from '@material-ui/core';
import { loadPlanetItem } from '../../../store/thunks/planets-thunks';
var useStyles = makeStyles(function () {
    return createStyles({
        table: {
            width: "100%",
        },
        tenthWidth: {
            width: "10%",
        },
        spinnerContainer: {
            width: '100%',
            minHeight: "550px",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white'
        }
    });
});
/** Component that renders a chosen planet's data */
export var PlanetsItemScreen = function () {
    var history = useHistory();
    var materialUIStyles = useStyles();
    var queryParam = useParams();
    var planet = useSelector(function (state) { return state.planetsStore.planetItem; });
    var dispatch = useDispatch();
    /**  Hook that triggers planet's entry loading if there's one existing. */
    useEffect(function () {
        if (planet && !queryParam.id) {
            history.replace("/planets/" + planet.docId);
        }
        dispatch(loadPlanetItem(queryParam.id));
    }, [queryParam.id]);
    var isPlanetLoadingPending = useSelector(function (state) { return state.planetsStore.isPlanetLoadingPending; });
    if (!planet && !isPlanetLoadingPending) {
        return _jsx(Redirect, { to: "/not-found" }, void 0);
    }
    if (isPlanetLoadingPending) {
        return (_jsx(_Fragment, { children: _jsx("div", __assign({ className: materialUIStyles.spinnerContainer }, { children: _jsx(CircularProgress, { color: "inherit" }, void 0) }), void 0) }, void 0));
    }
    return planet && (_jsx(_Fragment, { children: _jsx(TableContainer, __assign({ component: Paper }, { children: _jsx(Table, __assign({ className: materialUIStyles.table, size: "medium" }, { children: _jsxs(TableBody, { children: [_jsxs(TableRow, { children: [_jsx(TableCell, __assign({ align: "left", className: materialUIStyles.tenthWidth }, { children: _jsx("strong", { children: "Name: " }, void 0) }), void 0),
                                _jsx(TableCell, __assign({ align: "center" }, { children: _jsx("h1", { children: planet.name }, void 0) }), void 0)] }, void 0),
                        _jsxs(TableRow, { children: [_jsx(TableCell, __assign({ align: "left", className: materialUIStyles.tenthWidth }, { children: _jsx("strong", { children: "Climate: " }, void 0) }), void 0),
                                _jsx(TableCell, __assign({ align: "center" }, { children: planet.climate }), void 0)] }, void 0),
                        _jsxs(TableRow, { children: [_jsx(TableCell, __assign({ align: "left", className: materialUIStyles.tenthWidth }, { children: _jsx("strong", { children: "Diameter: " }, void 0) }), void 0),
                                _jsx(TableCell, __assign({ align: "center" }, { children: planet.diameter }), void 0)] }, void 0),
                        _jsxs(TableRow, { children: [_jsx(TableCell, __assign({ align: "left", className: materialUIStyles.tenthWidth }, { children: _jsx("strong", { children: "Gravity: " }, void 0) }), void 0),
                                _jsx(TableCell, __assign({ align: "center" }, { children: planet.gravity }), void 0)] }, void 0),
                        _jsxs(TableRow, { children: [_jsx(TableCell, __assign({ align: "left", className: materialUIStyles.tenthWidth }, { children: _jsx("strong", { children: "Orbital period: " }, void 0) }), void 0),
                                _jsx(TableCell, __assign({ align: "center" }, { children: planet.orbitalPeriod }), void 0)] }, void 0),
                        _jsxs(TableRow, { children: [_jsx(TableCell, __assign({ align: "left", className: materialUIStyles.tenthWidth }, { children: _jsx("strong", { children: "Population: " }, void 0) }), void 0),
                                _jsx(TableCell, __assign({ align: "center" }, { children: planet.population }), void 0)] }, void 0),
                        _jsxs(TableRow, { children: [_jsx(TableCell, __assign({ align: "left", className: materialUIStyles.tenthWidth }, { children: _jsx("strong", { children: "Rotation period: " }, void 0) }), void 0),
                                _jsx(TableCell, __assign({ align: "center" }, { children: planet.rotationPeriod }), void 0)] }, void 0),
                        _jsxs(TableRow, { children: [_jsx(TableCell, __assign({ align: "left", className: materialUIStyles.tenthWidth }, { children: _jsx("strong", { children: "Surface water: " }, void 0) }), void 0),
                                _jsx(TableCell, __assign({ align: "center" }, { children: planet.surfaceWater }), void 0)] }, void 0),
                        _jsxs(TableRow, { children: [_jsx(TableCell, __assign({ align: "left", className: materialUIStyles.tenthWidth }, { children: _jsx("strong", { children: "Terrain: " }, void 0) }), void 0),
                                _jsx(TableCell, __assign({ align: "center" }, { children: planet.terrain }), void 0)] }, void 0)] }, void 0) }), void 0) }), void 0) }, void 0));
};
