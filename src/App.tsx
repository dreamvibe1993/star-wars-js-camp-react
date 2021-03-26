import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Backdrop, CircularProgress } from '@material-ui/core';

import './App.css';
import { Navbar } from './components/Navbar/Navbar';
import { MoviesSidebar } from './components/MoviesSidebar';
import { PeopleSidebar } from './components/PeopleSidebar';
import { PlanetsSidebar } from './components/PlanetsSidebar';
import { WelcomeScreen } from './components/WelcomeScreen';
import { LoginPage } from './components/LoginPage';
import { CreateMovieItemScreen } from './components/CreateMovieItemScreen';
import { NotFoundScreen } from './components/NotFoundScreen';
import { DRAWER_WIDTH } from './constants/sizing-constants';
import { ErrorScreen } from './components/ErrorScreen';
import { UserSignInStatus } from './store/reducer'

import { getSignInStatus } from './api/services/auth';
import { RootState } from './store/store';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: 0,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    contentShift: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: DRAWER_WIDTH,
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  })
);

/** Sidebar state to dispatch to context */
const defaultDrawerContext = {
  open: false,
}

export const DrawerContext = React.createContext(defaultDrawerContext);

export const App: React.FC = () => {

  const materialUIStyles = useStyles();
  const isUserSignedIn = useSelector((state: RootState) => state.authState.isUserSignedIn)
  const isCommonLoadingBackDropOn = useSelector((state: RootState) => state.componentsState.isCommonLoadingBckDropOn)

  /** Drawer (=== Sidebar) state context block */
  const [drawerContextValue, setDrawerContext] = useState(defaultDrawerContext)
  /** 
   * Function to change the state of the drawer openness 
   * It's passed into Navbar component where it's getting it's state (boolean: open or close)
   */
  const changeDrawerState = (isOpen: boolean): void => {
    setDrawerContext({ open: isOpen })
  }
  /** 
   * Getting the status out of the changed context 
   * It's passed into <main />'s "open" attribute
   */
  const { open } = drawerContextValue;

  useEffect(() => {
    getSignInStatus()
}, [isUserSignedIn])

  return (
    <div className="App">

      <DrawerContext.Provider value={drawerContextValue}>
        <Navbar setDrawerState={changeDrawerState} />
        <main
          className={clsx(materialUIStyles.content, {
            [materialUIStyles.contentShift]: open,
          })}
        >
          <div className={materialUIStyles.drawerHeader} />
          {isUserSignedIn !== UserSignInStatus.Pending && 
          <React.Fragment>
            <Route path="/" exact>
              <WelcomeScreen />
            </Route>
            <Route path="/films/:id?">
              <MoviesSidebar />
            </Route>
            <Route path="/people/:id?">
              <PeopleSidebar />
            </Route>
            <Route path="/planets/:id?">
              <PlanetsSidebar />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/create-film-entry">
              {isUserSignedIn === UserSignInStatus.Authorised ? <CreateMovieItemScreen /> : <Redirect to="/login" />}
            </Route>
            <Route path="/not-found">
              <NotFoundScreen />
            </Route>
            <Route path="/error">
              <ErrorScreen />
            </Route>
          </React.Fragment>}
        </main>
      </DrawerContext.Provider>
      <Backdrop className={materialUIStyles.backdrop} open={isCommonLoadingBackDropOn}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

