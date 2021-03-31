import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';

import {
    Button,
    Chip,
    CircularProgress,
    createStyles,
    FormControl,
    Input,
    InputLabel,
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
    useMediaQuery,
    useTheme
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

import { getMovieItemData } from '../../../api/services/load-movies-data-api';

import { Character } from '../../../models/character';
import { Planet } from '../../../models/planet';
import styles from './CreateMovieItemScreen.module.css';
import { createMovieItemYupValScheme } from '../../../models/yup-validation-schemas';
import { ITEM_HEIGHT, ITEM_PADDING_TOP } from '../../../constants/sizing-constants';
import { MovieTransferValueCreateForm } from '../../../models/movies-transfer-value-create-form';
import { RootState , setCommonBackdropOff, setCommonBackdropOn } from '../../../store/reducer';

import { addMovieEntry, loadDataToAddWhenCreating } from '../../../store/thunks/movies-thunks';
import { movieDTOMapper } from '../../../api/mappers/mapper';
import { Movie } from '../../../models/movie';
// import classes from "../../index.css"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                [theme.breakpoints.down('sm')]: {
                    margin: theme.spacing(0),
                },
            },
        },
        formControl: {
            margin: theme.spacing(1),
            width: '100%'
        },
        cancelButton: {
            marginRight: '10px',
        },
        spinnerContainer: {
            width: '100%',
            minHeight: "100px",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
    })
);

const validationSchema = createMovieItemYupValScheme;

const initialValues: Movie = {
    title: '',
    producer: '',
    releaseDate: '',
    director: '',
    openingCrawl: '',
    charactersPKs: [],
    planetsPKs: [],
    created: '',
    edited: '',
    episodeId: 0,
    speciesPKs: [],
    starshipsPKs: [],
    vehiclesPKs: [],
    pk: 0,
    docId: '',
    img: '',
}

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name: string, characterNames: string[], theme: Theme) {
    return {
        fontWeight:
            characterNames.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

/** Component that provides an interface to create a movie entry */
export const CreateMovieItemScreen: React.FC = () => {
    const theme = useTheme();
    const history = useHistory();
    const dispatch = useDispatch();
    /** Styles that are more superior than module.css */
    const materialUIStyles = useStyles();
    /** Characters to choose to add into a new movie entry */
    const characters = useSelector((state: RootState) => state.charactersStore.characters);
    /** Planets to choose to add into a new movie entry */
    const planets = useSelector((state: RootState) => state.planetsStore.planets);

    const areEntitiesLoading = useSelector((state: RootState) => state.moviesStore.areEntitiesLoading)
    /** State for chosen characters to be added */
    const [characterNames, setCharacterNames] = React.useState<string[]>([]);
    /** State for chosen planets to be added */
    const [planetNames, setPlanetNames] = React.useState<string[]>([]);
    /**
     * Adds names of chosen characters
     *
     * @param event Change event of a node
     */
    const handleChangeCharacters = (event: React.ChangeEvent<{ value: unknown }>) => {
        setCharacterNames(event.target.value as string[]);
    };
    /**
     * Adds names of chosen planets to state
     *
     * @param event Change event of a node
     */
    const handleChangePlanets = (event: React.ChangeEvent<{ value: unknown }>) => {
        setPlanetNames(event.target.value as string[]);
    };
    /** Loads Characters and Planets when first time launched */
    useEffect(() => {
        dispatch(loadDataToAddWhenCreating())
    }, [])

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            dispatch(addMovieEntry({ ...movieDTOMapper(values, 0) }))
        }
    })

    /** Refreshes personal keys array when a new character is chosen */
    useEffect(() => {
        const charactersCollection = characters.filter((character: Character) => characterNames.find((name: string) => name === character.name))
        const charactersPersonalKeys = charactersCollection.map((character: Character) => character.pk)
        formik.setFieldValue('charactersPKs', charactersPersonalKeys)
    }, [characterNames])

    /** Refreshes personal keys array when a new planet is chosen */
    useEffect(() => {
        const planetsFiltered = planets.filter((planet: Planet) => planetNames.find((name: string) => name === planet.name))
        const planetsPersonalKeys = planetsFiltered.map((planet: Planet) => planet.pk)
        formik.setFieldValue('planetsPKs', planetsPersonalKeys)
    }, [planetNames])

    const isEntityBeingAdded = useSelector((state: RootState) => state.moviesStore.isEntityBeingAdded)

    if (isEntityBeingAdded) {
        return <Redirect to="/films" />
    }

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
                                            fullWidth
                                            />
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
                                            fullWidth
                                            />
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
                                            fullWidth
                                            />
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
                                            fullWidth
                                            />
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
                                            multiline
                                            />
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
                                            multiline
                                            />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left" className={styles.tenthWidth}><strong>Relevant characters and planets: </strong></TableCell>

                                    {!areEntitiesLoading ?
                                        <TableCell>
                                            <FormControl className={materialUIStyles.formControl} >
                                                <InputLabel id="mutiple-chip-label">Characters to add</InputLabel>

                                                <Select
                                                    id="mutiple-chip"
                                                    input={<Input id="select-multiple-chip" />}
                                                    labelId="mutiple-chip-label"
                                                    MenuProps={MenuProps}
                                                    onChange={handleChangeCharacters}
                                                    renderValue={(selected) => (
                                                        <div className={styles.chips}>
                                                            {(selected as string[]).map((value) => (
                                                                <Chip key={value} className={styles.chip} label={value} />
                                                            ))}
                                                        </div>
                                                    )}
                                                    value={characterNames}
                                                    multiple
                                                >
                                                    {characters.map((character: Character) => (
                                                        <MenuItem
                                                            key={character.name}
                                                            style={getStyles(character.name, characterNames, theme)}
                                                            value={character.name}>
                                                            {character.name}
                                                        </MenuItem>))}
                                                </Select>
                                            </FormControl>
                                            <FormControl className={materialUIStyles.formControl} >
                                                <InputLabel id="mutiple-chip-label">Planets to add</InputLabel>

                                                <Select
                                                    id="mutiple-chip"
                                                    input={<Input id="select-multiple-chip" />}
                                                    labelId="mutiple-chip-label"
                                                    MenuProps={MenuProps}
                                                    onChange={handleChangePlanets}
                                                    renderValue={(selected) => (
                                                        <div className={styles.chips}>
                                                            {(selected as string[]).map((value) => (
                                                                <Chip key={value} className={styles.chip} label={value} />
                                                            ))}
                                                        </div>
                                                    )}
                                                    value={planetNames}
                                                    multiple
                                                >
                                                    {planets.map((planet: Planet) => (<MenuItem key={planet.name} style={getStyles(planet.name, planetNames, theme)} value={planet.name}>
                                                        {planet.name}
                                                    </MenuItem>))}
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                        :
                                        <div className={materialUIStyles.spinnerContainer}>
                                            <CircularProgress />
                                        </div>
                                    }
                                </TableRow>
                                <TableRow />
                                <TableRow >
                                    <TableCell align="left" />
                                    <TableCell align="right">
                                        <div className={styles.buttonContainer}>
                                            <Link className={styles.link} to="/films">
                                                <Button
                                                    className={materialUIStyles.cancelButton}
                                                    color="primary"
                                                    type="button"
                                                    variant="contained">
                                                    CANCEL
                                            </Button>
                                            </Link>
                                            <Button
                                                color="primary"
                                                type="submit"
                                                variant="contained">
                                                SAVE
                                        </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </form>
            </div>
        </>
    )
}

