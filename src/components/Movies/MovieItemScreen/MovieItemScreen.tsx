import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory, useLocation, useParams } from 'react-router-dom';

import {
    CircularProgress,
    createStyles,
    FormControl,
    InputLabel,
    makeStyles,
    Select,
    TableCell,
    Theme
} from '@material-ui/core';

import { MovieItemEditForm } from '../MovieItemEditForm'
import { Character } from '../../../models/character';
import { Planet } from '../../../models/planet';
import { Params } from '../../../models/query-params'

import { getMovieItemData } from '../../../api/services/load-movies-data-api';
import { MovieItemDisplayComponent } from '../MovieItemDisplayComponent';
import { RootState } from '../../../store/store';
import { UserSignInStatus } from '../../../store/reducer';
import { loadMovieItem } from '../../../store/thunks/movies-thunks';

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
            backgroundColor: 'white'
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
                <div className={materialUIStyles.spinnerContainer} >
                    <CircularProgress color="inherit" />
                </div>
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
        <FormControl className={materialUIStyles.formControl}>
            <InputLabel htmlFor="select-multiple-native" shrink>
                Characters (click to see the info)
                                        </InputLabel>
            <Select
                inputProps={{
                    id: 'select-multiple-native',
                }}
                value={relevantCharacters}
                multiple
                native
            >
                {relevantCharacters && relevantCharacters.map((character: Character) => (<option key={character.docId} onClick={() => renderCharacInfo(character.docId)} value={character.name}>
                    {character.name}
                </option>))}
            </Select>
        </FormControl>
    )
    const relevantPlanetsJSX = (
        <FormControl className={materialUIStyles.formControl}>
            <InputLabel htmlFor="select-multiple-native" shrink>
                Planets (click to see the info)
                                </InputLabel>
            <Select
                inputProps={{
                    id: 'select-multiple-native',
                }}
                value={relevantCharacters}
                multiple
                native
            >
                {relevantPlanets && relevantPlanets.map((planet: Planet) => (<option key={planet.docId} onClick={() => renderPlanetInfo(planet.docId)} value={planet.name}>
                    {planet.name}
                </option>))}
            </Select>
        </FormControl>
    )

    const relevantEntitiesBlock = (relevantPlanets || relevantCharacters) && (
        <>
            <TableCell align="left"><strong>Participated characters and planets: </strong></TableCell>
            <TableCell align="center">
                {relevantPlanets && relevantPlanetsJSX}
                {relevantCharacters && relevantCharactersJSX}
            </TableCell>
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
