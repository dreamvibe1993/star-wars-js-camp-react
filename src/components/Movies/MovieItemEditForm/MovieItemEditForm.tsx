import React from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';

import {
    Button,
    createStyles,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField,
    Theme
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

import { Movie } from '../../../models/movie';
import { MovieTransferValueEditForm } from '../../../models/movie-transfer-value-edit-form'
import { movieEditYupValScheme } from '../../../models/yup-validation-schemas';
import styles from './MovieItemEditForm.module.css'
import { editMovieEntry } from '../../../api/services/edit-movie-data';
import { RootState } from '../../../store/store';
import { UserSignInStatus } from '../../../store/reducer';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        cancelButton: {
            marginRight: "10px",
        }
    }),
);

const validationSchema = movieEditYupValScheme;

/** Interface for that component's props */
interface EditFormProps {
    /** Fields of a movie to edit */
    movie: Movie;
}

/**
 * Function that returns an op. crawl without line breakages
 * @param openingCrawl Text that follows before every sw movie.
 */
function getRidOfLineBreaks(openingCrawl: string): string {
    return openingCrawl.replace(/[\n\r]+/gm, ' ')
}

/** Component that renders an interface for an entry editing */
export const MovieItemEditForm: React.FC<EditFormProps> = ({ movie }) => {
    const history = useHistory();
    const materialUIStyles = useStyles();

    /** Variable to check if a user's logged in */
    const isUserSignedIn = useSelector((state: RootState) => state.authState.isUserSignedIn)

    const formik = useFormik({
        initialValues: {
            title: movie.title,
            producer: movie.producer,
            releaseDate: movie.releaseDate,
            director: movie.director,
            openingCrawl: getRidOfLineBreaks(movie.openingCrawl)
        },
        validationSchema,
        onSubmit: (values: MovieTransferValueEditForm) => {
            editMovieEntry(movie, values).then(() => {
                console.log("Document successfully updated!");
                history.push("/films/")
            })
                .catch((error: Error) => {
                    console.error("Error updating document: ", error);
                    history.push('/error')
                });
        }
    })

    return (
        <>
            <div className={materialUIStyles.root}>
                <form onSubmit={formik.handleSubmit}>
                    <TableContainer component={Paper}>
                        <Table className={styles.table} size="medium">
                            <TableBody>
                                <TableRow >
                                    <TableCell align="left" className={styles.tenthWidth} ><strong>Title: </strong></TableCell>
                                    <TableCell>
                                        <TextField error={formik.touched.title && Boolean(formik.errors.title)}
                                            helperText={formik.touched.title && formik.errors.title}
                                            name="title"
                                            onChange={formik.handleChange}
                                            value={formik.values.title}
                                            variant="outlined"
                                            fullWidth />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left" className={styles.tenthWidth} ><strong>Producer: </strong></TableCell>
                                    <TableCell>
                                        <TextField error={formik.touched.producer && Boolean(formik.errors.producer)}
                                            helperText={formik.touched.producer && formik.errors.producer}
                                            name="producer"
                                            onChange={formik.handleChange}
                                            value={formik.values.producer}
                                            variant="outlined"
                                            fullWidth />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left" className={styles.tenthWidth} ><strong>Release date: </strong></TableCell>
                                    <TableCell>
                                        <TextField error={formik.touched.releaseDate && Boolean(formik.errors.releaseDate)}
                                            helperText={formik.touched.releaseDate && formik.errors.releaseDate}
                                            name="releaseDate"
                                            onChange={formik.handleChange}
                                            type="date"
                                            value={formik.values.releaseDate}
                                            variant="outlined"
                                            fullWidth />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left" className={styles.tenthWidth}><strong>Director: </strong></TableCell>
                                    <TableCell>
                                        <TextField error={formik.touched.director && Boolean(formik.errors.director)}
                                            helperText={formik.touched.director && formik.errors.director}
                                            name="director"
                                            onChange={formik.handleChange}
                                            value={formik.values.director}
                                            variant="outlined"
                                            fullWidth />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left" className={styles.tenthWidth}><strong>Opening crawl: </strong></TableCell>
                                    <TableCell>
                                        <TextField error={formik.touched.openingCrawl && Boolean(formik.errors.openingCrawl)}
                                            helperText={formik.touched.openingCrawl && formik.errors.openingCrawl}
                                            name="openingCrawl"
                                            onChange={formik.handleChange} value={formik.values.openingCrawl}
                                            variant="outlined"
                                            fullWidth
                                            multiline />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {isUserSignedIn === UserSignInStatus.Authorised &&
                        <div className={styles.buttonContainer}>
                            <Button className={materialUIStyles.cancelButton} color="primary" onClick={() => history.goBack()} type="button" variant="contained">CANCEL</Button>
                            <Button color="primary" type="submit" variant="contained">SAVE</Button>
                        </div>}
                </form>
            </div>
        </>
    )
}
