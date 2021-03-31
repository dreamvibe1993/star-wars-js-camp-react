import React, { useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import {
    Button,
    Checkbox,
    CircularProgress,
    createStyles,
    FormControl,
    Input,
    InputLabel,
    ListItemText,
    makeStyles,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField,
    Theme,
    useMediaQuery
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

import { Movie } from '../../../../models/movie';
import { MovieTransferValueEditForm } from '../../../../models/movie-transfer-value-edit-form'
import { movieEditYupValScheme } from '../../../../models/yup-validation-schemas';
import styles from './MovieItemEditForm.module.css'
import { RootState , setRelevChars, setRelevPlanets, UserSignInStatus } from '../../../../store/reducer';

import { MoviesDTO } from '../../../../api/dtos/MovieDTO';
import { movieDTOMapper } from '../../../../api/mappers/mapper';
import { editMovieEntry, loadDataToAddWhenCreating } from '../../../../store/thunks/movies-thunks';
import { Planet } from '../../../../models/planet';
import { ITEM_HEIGHT, ITEM_PADDING_TOP } from '../../../../constants/sizing-constants';
import { Character } from '../../../../models/character';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                [theme.breakpoints.down('xs')]: {
                    margin: theme.spacing(0),
                },
            },
        },
        cancelButton: {
            marginRight: "10px",
        },
        formControl: {
            margin: theme.spacing(1),
            width: '100%',
            [theme.breakpoints.down('xs')]: {
                margin: theme.spacing(0),
                minWidth: 120,
                maxWidth: 180,
            },
        },
        loseWrap: {
            whiteSpace: 'normal'
        },
        spinnerContainer: {
            width: '100%',
            minHeight: "100px",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
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
 *
 * @param openingCrawl Text that follows before every sw movie.
 */
function getRidOfLineBreaks(openingCrawl: string): string {
    return openingCrawl.replace(/[\n\r]+/gm, ' ')
}

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 100,
            // whiteSpace: 'normal',
        },
    },
};

/** Component that renders an interface for an entry editing */
export const MovieItemEditForm: React.FC<EditFormProps> = ({ movie }) => {
    const history = useHistory();
    const materialUIStyles = useStyles();
    const dispatch = useDispatch();

    const [characterNames, setCharacterNames] = React.useState<string[]>([]);
    const [planetsNames, setPlanetsNames] = React.useState<string[]>([]);

    const relevantCharacters = useSelector((state: RootState) => state.moviesStore.relevantCharacters)
    const relevantPlanets = useSelector((state: RootState) => state.moviesStore.relevantPlanets)

    const charsCollection = useSelector((state: RootState) => state.charactersStore.characters)
    const planetsCollection = useSelector((state: RootState) => state.planetsStore.planets)

    const [newRelevantCharacters, setNewRelevantCharacters] = React.useState<Character[] | null>(relevantCharacters)
    const [newRelevantPlanets, setNewRelevantPlanets] = React.useState<Planet[] | null>(relevantPlanets)


    useEffect(() => {
        dispatch(loadDataToAddWhenCreating())
    }, [])


    /** Variable to check if a user's logged in */
    const isUserSignedIn = useSelector((state: RootState) => state.authState.isUserSignedIn)

    const formik = useFormik({
        initialValues: {
            title: movie.title,
            producer: movie.producer,
            releaseDate: movie.releaseDate,
            director: movie.director,
            openingCrawl: getRidOfLineBreaks(movie.openingCrawl),
            charactersPKs: movie.charactersPKs,
            planetsPKs: movie.planetsPKs,
            created: movie.created,
            edited: movie.edited,
            episodeId: movie.episodeId,
            speciesPKs: movie.speciesPKs,
            starshipsPKs: movie.starshipsPKs,
            vehiclesPKs: movie.vehiclesPKs,
            pk: movie.pk,
            docId: movie.docId,
            img: movie.img
        },
        validationSchema,
        onSubmit: (values: Movie) => {
            const movieDTO = movieDTOMapper(values, movie.pk)
            dispatch(editMovieEntry({ MovieDTO: movieDTO, docID: values.docId }))
            dispatch(setRelevPlanets(newRelevantPlanets))
            dispatch(setRelevChars(newRelevantCharacters))
            history.goBack()
        },
    })

    const handleChangeCharacters = (event: React.ChangeEvent<{ value: unknown }>) => {
        setCharacterNames(event.target.value as string[]);
    };

    const handleChangePlanets = (event: React.ChangeEvent<{ value: unknown }>) => {
        setPlanetsNames(event.target.value as string[]);
    };

    useEffect(() => {
        if (relevantCharacters) {
            const names = relevantCharacters.map(char => char.name)
            setCharacterNames(names)
        }
        if (relevantPlanets) {
            const names = relevantPlanets.map(planet => planet.name)
            setPlanetsNames(names)
        }
    }, [relevantCharacters, relevantPlanets])

    useEffect(() => {
        const characters = charsCollection && charsCollection.filter((character: Character) => characterNames.find((name: string) => name === character.name))
        const charactersPersonalKeys = characters.map((character: Character) => character.pk)
        if (characters.length === 0) {
            setNewRelevantCharacters(null)
        } else {
            setNewRelevantCharacters(characters)
        }
        formik.setFieldValue('charactersPKs', charactersPersonalKeys)
    }, [characterNames, charsCollection])

    useEffect(() => {
        const planets = planetsCollection && planetsCollection.filter((planet: Planet) => planetsNames.find((name: string) => name === planet.name))
        const planetsPersonalKeys = planets.map((planet: Planet) => planet.pk)
        if (planets.length === 0) {
            setNewRelevantPlanets(null)
        } else {
            setNewRelevantPlanets(planets)
        }
        formik.setFieldValue('planetsPKs', planetsPersonalKeys)
    }, [planetsNames, planetsCollection])

    const isMediaQueryMatch375 = useMediaQuery('(max-width:414px)')
    
    return (
        <>
            <div className={materialUIStyles.root}>
                <form onSubmit={formik.handleSubmit}>
                    <TableContainer component={Paper}>
                        <Table size="medium">
                            <TableBody>
                                <TableRow >
                                    <TableCell align="left" className={styles.tenthWidth} ><strong>Title: </strong></TableCell>
                                    <TableCell>
                                        <TextField error={formik.touched.title && Boolean(formik.errors.title)}
                                            helperText={formik.touched.title && formik.errors.title}
                                            name="title"
                                            onChange={formik.handleChange}
                                            size={isMediaQueryMatch375 ? 'small' : 'medium'}
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
                                            size={isMediaQueryMatch375 ? 'small' : 'medium'}
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
                                            size={isMediaQueryMatch375 ? 'small' : 'medium'}
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
                                            size={isMediaQueryMatch375 ? 'small' : 'medium'}
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
                                            onChange={formik.handleChange} size={isMediaQueryMatch375 ? 'small' : 'medium'}
                                            value={formik.values.openingCrawl}
                                            variant="outlined"
                                            fullWidth
                                            multiline />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left" className={styles.tenthWidth}><strong>Img link: </strong></TableCell>
                                    <TableCell>
                                        <TextField
                                            name="img"
                                            onChange={formik.handleChange} size={isMediaQueryMatch375 ? 'small' : 'medium'}
                                            value={formik.values.img}
                                            variant="outlined"
                                            fullWidth
                                            multiline />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left" className={styles.tenthWidth}><strong>Characters: </strong></TableCell>
                                    <TableCell>
                                        <FormControl className={materialUIStyles.formControl}>
                                            <InputLabel id="characters">Add or remove</InputLabel>
                                            <Select
                                                id="characters"
                                                input={<Input />}
                                                labelId="characters"
                                                MenuProps={MenuProps}
                                                onChange={handleChangeCharacters}
                                                renderValue={(selected) => (selected as string[]).join(', ')}
                                                value={characterNames}
                                                multiple
                                            >
                                                {charsCollection && charsCollection.map((char) => (
                                                    <MenuItem key={char.docId} value={char.name}>
                                                        <Checkbox checked={characterNames.includes(char.name)} />
                                                        <ListItemText primary={char.name} />
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left" className={styles.tenthWidth}><strong>Planets: </strong></TableCell>
                                    <TableCell>
                                        <FormControl className={materialUIStyles.formControl}>
                                            <InputLabel id="planets">Add or remove</InputLabel>
                                            <Select
                                                id="planets"
                                                input={<Input />}
                                                labelId="planets"
                                                MenuProps={MenuProps}
                                                onChange={handleChangePlanets}
                                                renderValue={(selected) => (selected as string[]).join(', ')}
                                                value={planetsNames}
                                                multiple
                                            >
                                                {planetsCollection && planetsCollection.map((planet) => (
                                                    <MenuItem key={planet.docId} value={planet.name}>
                                                        <Checkbox checked={planetsNames.includes(planet.name)} />
                                                        <ListItemText primary={planet.name} />
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
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
