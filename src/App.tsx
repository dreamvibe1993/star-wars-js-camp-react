import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Backdrop, CircularProgress, CssBaseline, createMuiTheme, ThemeProvider, useMediaQuery } from '@material-ui/core';

import './App.css';
import { Navbar } from './components/Navbar/Navbar';
import { MoviesSidebar } from './components/Movies/MoviesSidebar';
import { CharactersSidebar } from './components/Characters/CharactersSidebar';
import { PlanetsSidebar } from './components/Planets/PlanetsSidebar';
import { WelcomeScreen } from './components/WelcomeScreen';
import { LoginPage } from './components/LoginPage';
import { CreateMovieItemScreen } from './components/Movies/CreateMovieItemScreen';
import { NotFoundScreen } from './components/NotFoundScreen';
import { DRAWER_WIDTH } from './constants/sizing-constants';
import { ErrorScreen } from './components/ErrorScreen';
import { UserSignInStatus , RootState } from './store/reducer'

import { getSignInStatus } from './api/services/auth';

import { RegistrationPage } from './components/RegistrationPage';
import { Sidebar } from './components/Sidebar';

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
      zIndex: theme.zIndex.drawer - 1,
      color: '#fff',
      overflow: 'hidden'
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

  useEffect(() => getSignInStatus(), [])

  const themingMode = useSelector((state: RootState) => state.componentsState.mode)

  const theme = createMuiTheme({
    palette: {
      type: themingMode ? 'dark' : 'light',
      primary: {
        light: themingMode ? '#484848' : '#757ce8',
        main: themingMode ? '#212121' : '#3f50b5',
        dark: themingMode ? '#000000' : '#002884',
        contrastText: '#fff'
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
  });

  const areMoviesLoaded = useSelector((state: RootState) => state.moviesStore.areMovieEntitiesLoaded)
  const areCharactersLoaded = useSelector((state: RootState) => state.charactersStore.areCharacterEntitiesLoaded)
  const arePlanetsLoaded = useSelector((state: RootState) => state.planetsStore.arePlanetEntitiesLoaded)

  const location = useLocation()
  const addresses = ['/create-film-entry', 'edit=1', '/login', '/register', '/', '/not-found']
  const checkAddress = (): boolean => addresses.includes(location.pathname)
  const checkStatus = (): boolean => {
    if (!(areMoviesLoaded || areCharactersLoaded || arePlanetsLoaded)) {
      return checkAddress()
    }
    return true
  }
  const [isCanShowMobileSidebar, setMobileSidebarStatus] = useState<boolean>(checkStatus())
  useEffect(() => {
    setMobileSidebarStatus(checkStatus())
  }, [areMoviesLoaded, areCharactersLoaded, arePlanetsLoaded, location.pathname])

  const isMediaQueryMatch375 = useMediaQuery('(max-width:414px)')

  const { Pending, Authorised, Unauthorised } = UserSignInStatus

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <DrawerContext.Provider value={drawerContextValue}>
            <Navbar setDrawerState={changeDrawerState} />
            <main
              className={clsx(materialUIStyles.content, {
                [materialUIStyles.contentShift]: open,
              })}
            >
              {(isMediaQueryMatch375 && isCanShowMobileSidebar) && <Sidebar setDrawerState={changeDrawerState}><div /></Sidebar>}
              <div className={materialUIStyles.drawerHeader} />
              <React.Fragment>
                <Switch>
                  <Route path="/" exact>
                    <WelcomeScreen />
                  </Route>
                  <Route path="/films/:id?">
                    <MoviesSidebar setDrawerState={changeDrawerState} />
                  </Route>
                  <Route path="/people/:id?">
                    <CharactersSidebar setDrawerState={changeDrawerState} />
                  </Route>
                  <Route path="/planets/:id?">
                    <PlanetsSidebar setDrawerState={changeDrawerState} />
                  </Route>
                  <Route path="/login">
                    <LoginPage />
                  </Route>
                  <Route path="/create-film-entry">
                    {isUserSignedIn !== Pending && (isUserSignedIn === Authorised ? <CreateMovieItemScreen /> : <Redirect to="/login" />)}
                  </Route>
                  <Route path="/not-found">
                    <NotFoundScreen />
                  </Route>
                  <Route path="/error">
                    <ErrorScreen />
                  </Route>
                  <Route path="/register">
                    <RegistrationPage />
                  </Route>
                  <Route path="*">
                    <Redirect to="/not-found" />
                  </Route>
                </Switch>
              </React.Fragment>
            </main>
          </DrawerContext.Provider>
          <Backdrop className={materialUIStyles.backdrop} open={isCommonLoadingBackDropOn} />

        </CssBaseline>

      </ThemeProvider>


    </div>
  );
}

