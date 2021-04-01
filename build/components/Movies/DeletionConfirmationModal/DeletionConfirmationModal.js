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
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button } from '@material-ui/core';
import styles from './DeletionConfirmationModal.module.css';
import { setDeletionModalClose } from '../../../store/thunks/components-thunks';
import { deleteMovieEntry } from '../../../store/thunks/movies-thunks';
var useStyles = makeStyles(function (theme) {
    return createStyles({
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    });
});
/** Little modal window asking if a user is really sure to delete a movie entry */
export var DeletionConfirmationModal = function (_a) {
    var movieID = _a.movieID;
    var materialUIStyles = useStyles();
    var dispatch = useDispatch();
    var isEntityBeingDeleted = useSelector(function (state) { return state.moviesStore.isEntityBeingDeleted; });
    /** Variable to set opened or closed state of the modal */
    var open = useSelector(function (state) { return state.componentsState.isDeletionConfirmationOpen; });
    if (isEntityBeingDeleted) {
        return _jsx(Redirect, { to: "/" }, void 0);
    }
    return (_jsx("div", { children: _jsx(Modal, __assign({ "aria-describedby": "transition-modal-description", "aria-labelledby": "transition-modal-title", BackdropComponent: Backdrop, BackdropProps: {
                timeout: 500,
            }, className: styles.modal, onClose: function () { return dispatch(setDeletionModalClose()); }, open: open, closeAfterTransition: true }, { children: _jsx(Fade, __assign({ in: open }, { children: _jsxs("div", __assign({ className: materialUIStyles.paper }, { children: [_jsx("h2", __assign({ id: "transition-modal-title" }, { children: "Are you sure you want to delete this entry?" }), void 0),
                        _jsxs("div", __assign({ className: styles.buttons }, { children: [_jsx(Button, __assign({ color: "primary", onClick: function () { return dispatch(deleteMovieEntry(movieID)); }, type: "button", variant: "contained" }, { children: "YES" }), void 0),
                                _jsx(Button, __assign({ color: "primary", onClick: function () { return dispatch(setDeletionModalClose()); }, type: "button", variant: "contained" }, { children: "NO" }), void 0)] }), void 0)] }), void 0) }), void 0) }), void 0) }, void 0));
};
