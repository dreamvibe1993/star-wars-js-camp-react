import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory, useLocation, useParams } from 'react-router-dom';

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    CircularProgress,
    createStyles,
    FormControl,
    Grid,
    InputLabel,
    makeStyles,
    Paper,
    Select,
    TableCell,
    Theme,
    Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { MovieItemEditForm } from '../MovieItemEditForm'
import { Character } from '../../../models/character';
import { Planet } from '../../../models/planet';
import { Params } from '../../../models/query-params'

import { getMovieItemData } from '../../../api/services/load-movies-data-api';
import { MovieItemDisplayComponent } from '../MovieItemDisplayComponent';
import { RootState, setMovieLoadingPending } from '../../../store/reducer';
import { UserSignInStatus } from '../../../store/reducer';
import { loadMovieItem } from '../../../store/thunks/movies-thunks';
import { CharacterItemScreen } from '../../Characters/CharacterItemScreen';
import { Card } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 300,
            maxWidth: 600,
        },
        deleteButton: {
            marginRight: '15px'
        },
        spinnerContainer: {
            width: '100%',
            minHeight: "550px",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        grid: {
            flexGrow: 1,
            backgroundColor: 'rgb(0,0,0,.05)',
            borderRadius: '5px'
        },
        media: {
            height: 200,
        }
    }),
);

/** Component that renders a chosen movie's data */
export const MovieItemScreen: React.FC = () => {
    const materialUIStyles = useStyles();
    const history = useHistory()
    const dispatch = useDispatch();
    const location = useLocation()

    /** Variable to check if a user's logged in */
    const isUserSignedIn = useSelector((state: RootState) => state.authState.isUserSignedIn)

    /** Variable to check if there's any relevant planets */
    const relevantPlanets = useSelector((state: RootState) => state.moviesStore.relevantPlanets)

    
    /** Variable to check if there's any relevant characters */
    const relevantCharacters = useSelector((state: RootState) => state.moviesStore.relevantCharacters)
    
    const queryParam = useParams<Params>()
    const queries = new URLSearchParams(location.search)
    
    /** Query in case of a user decides to edit an entry */
    const edit: string | null = queries.get('edit')
    
    const movie = useSelector((state: RootState) => state.moviesStore.movieItem)
    const isMovieLoadingPending = useSelector((state: RootState) => state.moviesStore.isMovieLoadingPending)
    
    /** If a user got back from another tab pastes an ID of a current entry */
    useEffect(() => {
        if (movie && movie.docId && !queryParam.id) {
            history.replace(`/films/${movie.docId}`)
        }
        dispatch(loadMovieItem(queryParam.id))
    }, [queryParam.id])
    

    if (isMovieLoadingPending) {
        return (
            <>
                <Paper className={materialUIStyles.spinnerContainer} >
                    <CircularProgress color="inherit" />
                </Paper>
            </>
        )
    }

    /** if there's no movie item show nothing */
    if (!movie && !isMovieLoadingPending) {
        return <Redirect to="/not-found" />
    }


    /** If a user decides to see an info about a relevant character pastes a link of such */
    function renderCharacInfo(charID: string) {
        history.push(`/people/${charID}`);
    }
    /** If a user decides to see an info about a relevant planet pastes a link of such */
    function renderPlanetInfo(planetID: string) {
        history.push(`/planets/${planetID}`);
    }

    const relevantCharactersJSX = (
        <Accordion style={{ width: '100%', marginTop: '15px' }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography align='center' variant="h6" gutterBottom>LIST OF THE MOVIE CHARACTERS</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid className={materialUIStyles.grid} spacing={2} container>
                    {relevantCharacters && relevantCharacters.map(character => (
                        <Grid key={character.docId} onClick={() => renderCharacInfo(character.docId)} xs={2} item>
                            <Card>
                                <CardActionArea>
                                    <CardMedia
                                        className={materialUIStyles.media}
                                        image={character.image || 'https://via.placeholder.com/200x300?text=No+image'}
                                        title={character.name}
                                    />
                                    <CardContent>
                                        <Typography component="h2" variant="h5" gutterBottom>
                                            {character.name}
                                        </Typography>
                                        <Typography color="textSecondary" component="p" variant="body2">
                                            Color of the eyes: {character.eyeColor}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions style={{display: 'flex', justifyContent: 'space-around'}}>
                                    <Button color="inherit" size="small">
                                        Learn More
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </AccordionDetails>
        </Accordion>


    )
    const relevantPlanetsJSX = (

        <Accordion style={{ width: '100%', marginTop: '15px' }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography align='center' variant="h6" gutterBottom>LIST OF THE MOVIE PLANETS</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid className={materialUIStyles.grid} spacing={2} container>
                    {relevantPlanets && relevantPlanets.map(planet => (
                        <Grid key={planet.docId} onClick={() => renderPlanetInfo(planet.docId)} xs={2} item>
                            <Card>
                                <CardActionArea>
                                    <CardMedia
                                        className={materialUIStyles.media}
                                        image={planet.img || 'https://via.placeholder.com/200x300?text=No+image'}
                                        title={planet.name}
                                    />
                                    <CardContent>
                                        <Typography component="h2" variant="h5" gutterBottom>
                                            {planet.name}
                                        </Typography>
                                        <Typography color="textSecondary" component="p" variant="body2">
                                            Diameter: {planet.diameter}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions style={{display: 'flex', justifyContent: 'space-around'}}>
                                    <Button color="inherit" size="small">
                                        Learn More
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </AccordionDetails>
        </Accordion>
    )

    const relevantEntitiesBlock = (relevantPlanets || relevantCharacters) && (
        <>
            {relevantCharacters && relevantCharactersJSX}
            {relevantPlanets && relevantPlanetsJSX}
        </>
    );


    if (isUserSignedIn === UserSignInStatus.Unauthorised && edit) {
        return (
            <>
                <h3>Only logged users can edit entries</h3>
                <Link to="/login">Login</Link>
            </>
        )
    }

    if (edit && movie) {
        return <MovieItemEditForm movie={movie} />
    }
    if (!edit && movie) {
        return < MovieItemDisplayComponent movie={movie} relevantEntitiesBlock={relevantEntitiesBlock} />
    }
    return null
}

