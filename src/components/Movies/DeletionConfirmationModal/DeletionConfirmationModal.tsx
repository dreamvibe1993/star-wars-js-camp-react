/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import {
    makeStyles,
    Theme,
    createStyles
} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button } from '@material-ui/core';

import styles from './DeletionConfirmationModal.module.css'

import { deleteMovieEntry, setDeletionModalClose } from '../../../store/redux-slices/movies';
import { RootState } from '../../../store/store-types';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }),
);

interface DelConfModProps {
    /** Id of an entry to delete */
    movieID: string
}

/** Little modal window asking if a user is really sure to delete a movie entry */
export const DeletionConfirmationModal: React.FC<DelConfModProps> = ({ movieID }: DelConfModProps) => {
    const materialUIStyles = useStyles();
    const dispatch = useDispatch();

    /** State to redirect a user if an entry is being deleted */
    const isEntityBeingDeleted = useSelector((state: RootState) => state.moviesStore.isEntityBeingDeleted)

    /** Variable to set opened or closed state of the modal */
    const open = useSelector((state: RootState) => state.moviesStore.isDeletionConfirmationOpen);

    /** Redirect if an entry is being deleted */
    if (isEntityBeingDeleted) {
        return <Redirect to="/star-wars-react/" />
    }

    return (
        <div>
            <Modal
                aria-describedby="transition-modal-description"
                aria-labelledby="transition-modal-title"
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
                className={styles.modal}
                onClose={() => dispatch(setDeletionModalClose())}
                open={open}
                closeAfterTransition
            >
                <Fade in={open}>
                    <div className={materialUIStyles.paper}>
                        <h2 id="transition-modal-title">Are you sure you want to delete this entry?</h2>
                        <div className={styles.buttons}>
                            <Button color="primary" onClick={() => dispatch(deleteMovieEntry(movieID))} type="button" variant="contained">YES</Button>
                            <Button color="primary" onClick={() => dispatch(setDeletionModalClose())} type="button" variant="contained">NO</Button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}

