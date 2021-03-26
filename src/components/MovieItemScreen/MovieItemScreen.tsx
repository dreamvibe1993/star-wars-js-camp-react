import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';

import {
    createStyles,
    FormControl,
    InputLabel,
    makeStyles,
    Select,
    TableCell,
    Theme
} from '@material-ui/core';

import { MovieItemEditForm } from '../MovieItemEditForm'
import { Person } from '../../models/person';
import { Planet } from '../../models/planet';
import { Params } from '../../models/query-params'

import { loadMovieItemData } from '../../api/services/load-movies-data';
import * as actionCreators from '../../store/action-creators/action-creators'
import { MovieItemDisplayComponent } from '../MovieItemDisplayComponent';
import { RootState } from '../../store/store';
import { UserSignInStatus } from '../../store/reducer';

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
    const relevantPlanets = useSelector((state: RootState) => state.dataStore.relevantPlanets)

    /** Variable to check if there's any relevant characters */
    const relevantCharacters = useSelector((state: RootState) => state.dataStore.relevantCharacters)

    const queryParam = useParams<Params>()
    const queries = new URLSearchParams(location.search)

    /** Query in case of a user decides to edit an entry */
    const edit: string | null = queries.get('edit')

    const movie = useSelector((state: RootState) => state.dataStore.movieItem)

    /** State of movie's existence in the db */
    // const [isEntryExist, setEntryExist] = useState<boolean>();
    
    /** Hook that triggers movie's loading if one exists */
    useEffect(() => {
        dispatch(actionCreators.setCommonBackdropOff())
        return loadMovieItemData(queryParam.id, () => { history.push('/not-found') });
    }, [queryParam.id])


    /** If a user got back from another tab pastes an ID of a current entry */
    useEffect(() => {
        if (movie && movie.docId && !queryParam.id) {
            history.replace(`/films/${movie.docId}`)
        }
    }, [queryParam.id])

    /** if there's no movie item show nothing */
    if (!movie) {
        return null
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
                {relevantCharacters.map((character: Person) => (<option key={character.docId} onClick={() => renderCharacInfo(character.docId)} value={character.name}>
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
                {relevantPlanets.map((planet: Planet) => (<option key={planet.docId} onClick={() => renderPlanetInfo(planet.docId)} value={planet.name}>
                    {planet.name}
                </option>))}
            </Select>
        </FormControl>
    )

    const relevantEntitiesBlock = (relevantPlanets[0] || relevantCharacters[0]) && (
            <>
                <TableCell align="left"><strong>Participated characters and planets: </strong></TableCell>
                <TableCell align="center">
                    {relevantPlanets.length > 0 && relevantPlanetsJSX}
                    {relevantCharacters.length > 0 && relevantCharactersJSX}
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

    return edit && movie.title 
    ? <MovieItemEditForm movie={movie} /> 
    : < MovieItemDisplayComponent movie={movie} relevantEntitiesBlock={relevantEntitiesBlock} />
       
}

