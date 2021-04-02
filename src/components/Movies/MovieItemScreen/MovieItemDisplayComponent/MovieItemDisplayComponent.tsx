/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
    Button,
    Card,
    CardActionArea,
    CardMedia,
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

import { Movie } from '../../../../models/movie';
import { DeletionConfirmationModal } from '../../DeletionConfirmationModal';
import styles from '../MovieItemScreen.module.css'

import { UserSignInStatus } from '../../../../store/redux-slices/auth';
import { setDeletionModalOpen } from '../../../../store/redux-slices/movies';
import { RootState } from '../../../../store/store-types';

interface Props {
    movie: Movie;
    relevantEntitiesBlock: JSX.Element | null;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        deleteButton: {
            marginRight: '15px'
        },
        tableContainer: {
            display: 'flex',
            [theme.breakpoints.down('sm')]: {
                flexDirection: 'column',
                minWidth: '300px',
            },
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
        buttonTableCell: {
            borderBottom: 'none',
            [theme.breakpoints.down('sm')]: {
                width: '500px'
            },
        },
    }),
);

/**
 * Component to display a movie data.
 *
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
            pathname: `/star-wars-react/films/${movie.docId}`,
            search: `edit=1`,
        })
    }
    
    return (
        <>
            <DeletionConfirmationModal movieID={movie.docId} />
            <div>
                <TableContainer className={materialUIStyles.tableContainer} component={Paper}>
                    <Card className={materialUIStyles.card}>
                        <CardActionArea>
                            <CardMedia
                                className={materialUIStyles.imgContainer}
                                image={movie.img || 'https://via.placeholder.com/728x1000?text=No+image'}
                                title={movie.title}
                            />
                        </CardActionArea>
                    </Card>
                    <Table className={styles.table} size="medium">
                        <TableBody>
                            <TableRow >
                                <TableCell align="left" ><strong>Title: </strong></TableCell>
                                <TableCell align="center">
                                    <h1>{movie.title}</h1>
                                </TableCell>
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
                            <TableRow >
                                <TableCell style={{ borderBottom: 'none' }} />
                                <TableCell align="right" className={materialUIStyles.buttonTableCell}>
                                    {isUserSignedIn === UserSignInStatus.Authorised &&
                                        <div>
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
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                {relevantEntitiesBlock}
            </div>
        </>)
}
