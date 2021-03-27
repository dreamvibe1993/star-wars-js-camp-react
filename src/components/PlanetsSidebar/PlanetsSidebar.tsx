import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';

import {
    Backdrop,
    CircularProgress,
    createStyles,
    List,
    ListItem,
    ListItemText,
    makeStyles,
    Theme
} from '@material-ui/core';

import { Planet } from '../../models/planet';
import { WelcomeScreen } from '../WelcomeScreen';
import { Sidebar } from '../Sidebar';
import { PlanetsItemScreen } from '../PlanetsItemScreen';
import { Params } from '../../models/query-params'
import styles from './PlanetsSidebar.module.css'
import { NAVBAR_HEIGHT } from '../../constants/sizing-constants';
import { ITEM_HEIGHT } from '../../constants/sizing-constants';

import * as actionCreators from '../../store/action-creators/action-creators';
import { loadMorePlanetsItems, loadPlanetsData } from '../../api/services/load-planets-data';
import { RootState } from '../../store/store';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
            position: "absolute"
        },
        activeLink: {
            backgroundColor: 'rgba(0,0,0, .1)'
        }
    }),
);

/** Sidebar (or a drawer) where the planets items are displayed */
export const PlanetsSidebar: React.FC = () => {
    const materialUIStyles = useStyles();
    const dispatch = useDispatch();
    const queryParams = useParams<Params>();

    /** Variable to check if there's a planet item */
    const planet = useSelector((state: RootState) => state.planetsStore.planetItem)
    /** Variable to check if there's any planets loaded */
    const planets: Planet[] = useSelector((state: RootState) => state.planetsStore.planets)
    const isSidebarLoading = useSelector((state: RootState) => state.componentsState.isSidebarLoading)
    const numberOfItemsToDisplay = useSelector((state: RootState) => state.planetsStore.itemsToDispPlanets);

    const listItems = planets.map((planetItem: Planet) => (
        <ListItem key={planetItem.docId} activeClassName={materialUIStyles.activeLink} component={NavLink} to={`/planets/${planetItem.docId}`} button>
            <ListItemText primary={planetItem.name} />
        </ListItem>
    ))

    /** Hook that loads planets items if a number of the items is changed */
    useEffect(() => {
        loadPlanetsData()
            .then((querySnapshot) => {
            const last = querySnapshot.docs[numberOfItemsToDisplay]
            if (last) {
                dispatch(actionCreators.setSidebarLoadingOn())
                loadMorePlanetsItems(last, numberOfItemsToDisplay).then(() => dispatch(actionCreators.setSidebarLoadingOff()))
            }
        });
    }, [numberOfItemsToDisplay])

    /** Hook that triggers the common backdrop to appear */
    useEffect(() => {
        if (planets.length < 1) {
            dispatch(actionCreators.setCommonBackdropOn())
        } else {
            dispatch(actionCreators.setCommonBackdropOff())
        }
    }, [planets.length])

    /** If a window size was changed rerenders planets items into the sidebar */
    function getAmountOfItemsPerWindowSize() {
        const ammount = Math.ceil((window.innerHeight - NAVBAR_HEIGHT) / ITEM_HEIGHT)
        dispatch(actionCreators.setNumberOfItemsDisplayPlanets(ammount))
    }

    /** When the component's loaded loads first batch of planets items and does so if the num of the items' changed */
    useEffect(() => {
        getAmountOfItemsPerWindowSize()
        if (numberOfItemsToDisplay === 1) {
            dispatch(actionCreators.addItemsToDisplayPlanets())
            dispatch(actionCreators.setCommonBackdropOn())
        }
    }, [numberOfItemsToDisplay])

    /** Triggers recalculating of ammounts of planets items to display if the size of the window's changed */
    window.addEventListener('resize', () => dispatch(actionCreators.discardPlanetsItemsAmmount()));

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
                dispatch(actionCreators.addItemsToDisplayPlanets())
            }
        })
    }, [dispatch])

    return (
        <>
            <Sidebar >
                <div ref={scrollRef} className={styles.drawerContainer}>
                    <List>
                        {listItems}
                    </List>
                    <Backdrop className={materialUIStyles.backdrop} open={isSidebarLoading}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </div>
            </Sidebar>
            <div>
                {(planet || queryParams.id) ? <PlanetsItemScreen /> : <WelcomeScreen />}
            </div>
        </>
    )
}
