/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';

import {
    Backdrop,
    createStyles,
    List,
    ListItemText,
    makeStyles,
    Theme,
    ListItem
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Character } from '../../../models/character';
import { WelcomeScreen } from '../../WelcomeScreen';
import { Sidebar } from '../../Sidebar';
import { CharacterItemScreen } from '../CharacterItemScreen';
import { Params } from '../../../models/query-params'
import { NAVBAR_HEIGHT, ITEM_HEIGHT } from '../../../constants/sizing-constants';

import { addItemsToDisplayCharacters, discardCharactersItemsAmmount, lazyloadMoreCharacters, setNumberOfItemsDisplayCharacters } from '../../../store/redux-slices/characters'
import { movieSidebarSnapshotTeardown } from '../../../store/redux-slices/movies';
import { RootState } from '../../../store/store-types';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
            position: 'absolute'
        },
        activeLink: {
            backgroundColor: 'rgba(0,0,0, .1)'
        },
        drawerContainer: {
            overflow: 'auto'
        }
    }),
);

interface Props {
    setDrawerState: (isOpen: boolean) => void
}

/** Sidebar (or drawer) where the people items are displayed */
export const CharactersSidebar: React.FC<Props> = ({setDrawerState}) => {
    const materialUIStyles = useStyles();

    /** Variable to check if there's a person item */
    const character = useSelector((state: RootState) => state.charactersStore.characterItem)

    /** Variable to check if there's any people loaded */
    const characters: Character[] = useSelector((state: RootState) => state.charactersStore.characters)
    const isSidebarLoading = useSelector((state: RootState) => state.charactersStore.isSidebarLoading)
    const numberOfItemsToDisplay = useSelector((state: RootState) => state.charactersStore.itemsToDispCharacters);
    const queryParams = useParams<Params>();

    const dispatch = useDispatch();

    /** Unsubscribe from movies updates in the movie's sidebar */
    useEffect(() => {
        if (movieSidebarSnapshotTeardown) {
            movieSidebarSnapshotTeardown()
        }
    }, [movieSidebarSnapshotTeardown])

    const listItems = useMemo(() => characters.map((characterItem: Character) => (
        <ListItem key={characterItem.docId} activeClassName={materialUIStyles.activeLink} component={NavLink} to={`/star-wars-react/people/${characterItem.docId}`} button >
            <ListItemText primary={characterItem.name} />
        </ListItem>
    )), [characters])

    /** If a window size was changed rerenders people items into the sidebar */
    function getAmountOfItemsPerWindowSize() {
        const ammount = Math.ceil((window.innerHeight - NAVBAR_HEIGHT) / ITEM_HEIGHT)
        dispatch(setNumberOfItemsDisplayCharacters(ammount))
    }

    /** When the component's loaded loads first batch of people items and does so if the num of the items' changed */
    useEffect(() => {
        getAmountOfItemsPerWindowSize()
        if (numberOfItemsToDisplay === 1) {
            dispatch(addItemsToDisplayCharacters())
        }
        dispatch(lazyloadMoreCharacters(numberOfItemsToDisplay))
    }, [numberOfItemsToDisplay])

    /** Triggers recalculating of ammounts of people items to display if the size of the window's changed */
    window.addEventListener('resize', () => dispatch(discardCharactersItemsAmmount()));

    /** Reference to get scroll event */
    const scrollRef = useRef<HTMLDivElement>(null);

    /** Hook that gets a scroll event and loads more items */
    useEffect(() => {
        if (!scrollRef.current) {
            return;
        }
        const divListContainer = scrollRef.current
        divListContainer.addEventListener('scroll', () => {
            const scrollBottom = divListContainer.scrollHeight - divListContainer.scrollTop - divListContainer.clientHeight;
            if (!scrollBottom) {
                dispatch(addItemsToDisplayCharacters())
            }
        })
    }, [dispatch])

    return (
        <>
            <Sidebar setDrawerState={setDrawerState}>
                <div ref={scrollRef} className={materialUIStyles.drawerContainer}>
                    <List>
                        {listItems}
                    </List>
                    <Backdrop className={materialUIStyles.backdrop} open={isSidebarLoading}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </div>
            </Sidebar>
            {(queryParams.id || character) ? <CharacterItemScreen /> : <WelcomeScreen />}
        </>
    )
}