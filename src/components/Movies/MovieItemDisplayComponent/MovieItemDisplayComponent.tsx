import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { 
    Button, 
    createStyles, 
    makeStyles, 
    Paper, 
    Table, 
    TableBody,
    TableCell, 
    TableContainer, 
    TableRow, 
    Theme 
} from '@material-ui/core';

import { Movie } from '../../../models/movie';
import { DeletionConfirmationModal } from '../../DeletionConfirmationModal';
import styles from '../MovieItemScreen/MovieItemScreen.module.css'
import { RootState } from '../../../store/store';

import { UserSignInStatus, setDeletionModalOpen } from '../../../store/reducer';


interface Props {
    movie: Movie;
    relevantEntitiesBlock: JSX.Element | null;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        deleteButton: {
            marginRight: '15px'
        },
    }),
);

/**
 * Component to display a movie data.
 * @param movie Movie entity object to display
 * @param relevantEntitiesBlock JSX Element to display relevant entities.
 */
export const MovieItemDisplayComponent: React.FC<Props> = ({ movie, relevantEntitiesBlock }) => {
    const materialUIStyles = useStyles();
    const isUserSignedIn = useSelector((state: RootState) => state.authState.isUserSignedIn)
    const dispatch = useDispatch();
    const history = useHistory();

    /** If a user decides to edit an entry pastes an ID of an entry to edit */
    function pushEditQueryToURL() {
        history.push({
            pathname: `/films/${movie.docId}`,
            search: `edit=1`,
        })
    }

    return (
        <>
            <DeletionConfirmationModal movieID={movie.docId} />
            <div className={materialUIStyles.root}>
                <TableContainer component={Paper}>
                    <Table className={styles.table} size="medium">
                        <TableBody>
                            <TableRow >
                                <TableCell align="left" ><strong>Title: </strong></TableCell>
                                <TableCell align="center"><h1>{movie.title}</h1></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left" ><strong>Producer: </strong></TableCell>
                                <TableCell align="center">{movie.producer}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left" ><strong>Release date: </strong></TableCell>
                                <TableCell align="center">{movie.releaseDate}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left"><strong>Director: </strong></TableCell>
                                <TableCell align="center">{movie.director}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left"><strong>Opening crawl: </strong></TableCell>
                                <TableCell align="center">{movie.openingCrawl}</TableCell>
                            </TableRow>
                            <TableRow>
                                {relevantEntitiesBlock}
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                {isUserSignedIn === UserSignInStatus.Authorised &&
                    <div className={styles.buttonContainer}>
                        <Button
                            className={materialUIStyles.deleteButton}
                            color="primary"
                            onClick={() => dispatch(setDeletionModalOpen())}
                            type="button"
                            variant="contained"
                        >
                            DELETE
                        </Button>
                        <Button
                            color="primary"
                            onClick={() => pushEditQueryToURL()}
                            type="button"
                            variant="contained"
                        >
                            EDIT
            </Button>
                    </div>
                }
            </div>
        </>)
}
