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

import { Person } from '../../models/person';
import { WelcomeScreen } from '../WelcomeScreen';
import { Sidebar } from '../Sidebar';
import { CharacterItemScreen } from '../CharacterItemScreen';
import { Params } from '../../models/query-params'
import styles from './PeopleSidebar.module.css'
import { NAVBAR_HEIGHT, ITEM_HEIGHT } from '../../constants/sizing-constants';

import * as actionCreators from '../../store/action-creators/action-creators';
import { loadCharacterData } from '../../api/services/load-characters-data';
import { RootState } from '../../store/store';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
            position: 'absolute'
        },
        activeLink: {
            backgroundColor: 'rgba(0,0,0, .1)'
        }
    }),
);

/** Sidebar (or drawer) where the people items are displayed */
export const PeopleSidebar: React.FC = () => {
    const materialUIStyles = useStyles();

    /** Variable to check if there's a person item */
    const person = useSelector((state: RootState) => state.dataStore.personItem)

    /** Variable to check if there's any people loaded */
    const people: Person[] = useSelector((state: RootState) => state.dataStore.people)
    const isSidebarLoading = useSelector((state: RootState) => state.componentsState.isSidebarLoading)
    const numberOfItemsToDisplay = useSelector((state: RootState) => state.dataStore.itemsToDispPeople);
    const queryParams = useParams<Params>();

    const dispatch = useDispatch();

    const listItems = useMemo(() => people.map((personItem: Person) => (
        <ListItem key={personItem.docId} activeClassName={materialUIStyles.activeLink} component={NavLink} to={`/people/${personItem.docId}`} button >
            <ListItemText primary={personItem.name} />
        </ListItem>
    )), [people])

    /** Hook that loads people items if a number of the items is changed */
    useEffect(() => {
        dispatch(actionCreators.setSidebarLoadingOn())
        loadCharacterData(numberOfItemsToDisplay)
    }, [numberOfItemsToDisplay])

    /** If a window size was changed rerenders people items into the sidebar */
    function getAmountOfItemsPerWindowSize() {
        const ammount = Math.ceil((window.innerHeight - NAVBAR_HEIGHT) / ITEM_HEIGHT)
        dispatch(actionCreators.setNumberOfItemsDisplayPeople(ammount))
    }

    /** When the component's loaded loads first batch of people items and does so if the num of the items' changed */
    useEffect(() => {
        getAmountOfItemsPerWindowSize()
        if (numberOfItemsToDisplay === 1) {
            dispatch(actionCreators.setCommonBackdropOn())
            dispatch(actionCreators.addItemsToDisplayPeople())
        }
    }, [numberOfItemsToDisplay])

    /** Triggers recalculating of ammounts of people items to display if the size of the window's changed */
    window.addEventListener('resize', () => dispatch(actionCreators.discardPeopleItemsAmmount()));

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
                dispatch(actionCreators.addItemsToDisplayPeople())
            }
        })
    }, [dispatch])


    return (
        < >
            <Sidebar>
                <div ref={scrollRef} className={styles.drawerContainer}>
                    <List>
                        {listItems}
                    </List>
                    <Backdrop className={materialUIStyles.backdrop} open={isSidebarLoading}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </div>
            </Sidebar>
            {(queryParams.id || person) ? <CharacterItemScreen /> : <WelcomeScreen />}
        </>
    )
}