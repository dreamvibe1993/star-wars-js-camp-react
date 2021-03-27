import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';

import {
    createStyles,
    Divider,
    List,
    ListItem,
    ListItemText,
    makeStyles,
} from '@material-ui/core';

import { Movie } from '../../models/movie';
import { MovieItemScreen } from '../MovieItemScreen';
import { WelcomeScreen } from '../WelcomeScreen';
import { Params } from '../../models/query-params'
import { Sidebar } from '../Sidebar';

import { loadMoviesData } from '../../api/services/load-movies-data';
import styles from './MoviesSidebar.module.css'
import { RootState } from '../../store/store';
import { UserSignInStatus , setCommonBackdropOn, setCommonBackdropOff } from '../../store/reducer';


const useStyles = makeStyles(() =>
    createStyles({
        activeLink: {
            backgroundColor: 'rgba(0,0,0, .1)'
        }
    }),
);

/** Sidebar (or drawer) where the movie items are displayed */
export const MoviesSidebar: React.FC = () => {
    const materialUIStyles = useStyles();

    const dispatch = useDispatch();
    const queryParams = useParams<Params>()

    /** Variable to check if there's any movies */
    const movies: Movie[] = useSelector((state: RootState) => state.moviesStore.movies)

    /** Variable to check if there's a movie item */
    const movieItem = useSelector((state: RootState) => state.moviesStore.movieItem)

    /** Variable to check if a user's logged in */
    const isUserSignedIn = useSelector((state: RootState) => state.authState.isUserSignedIn)

    const listItems = movies.map((movie: Movie) => (
        <ListItem key={movie.docId} activeClassName={materialUIStyles.activeLink} component={NavLink} to={`/films/${movie.docId}`} button>
            <ListItemText primary={movie.title} />
        </ListItem>
    ))

    /** Hook that triggers movies loading */
    useEffect(() => loadMoviesData(), [])
    
    /** Hooks that triggers the backdrop on */
    useEffect(() => {
        if (movies.length < 1) {
            dispatch(setCommonBackdropOn())
        } else {
            dispatch(setCommonBackdropOff())
        }
    }, [movies.length])

    const createEntryButton = (
        < >
            <Divider />
            <ListItem component={NavLink} to="/create-film-entry" button divider>
                <ListItemText primary="Create an entry" />
            </ListItem>
        </>
    )

    return (
        <>
            <Sidebar>
                <div className={styles.drawerContainer}>
                    <List>
                        {listItems}
                        {isUserSignedIn === UserSignInStatus.Authorised && createEntryButton}
                    </List>
                </div>
            </Sidebar>
            {(movieItem || queryParams.id) ? <MovieItemScreen /> : <WelcomeScreen />}
        </>
    )
}