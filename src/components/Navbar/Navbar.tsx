import React, { useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
    makeStyles,
    Theme,
    createStyles
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Switch from '@material-ui/core/Switch';

import { IconButton, useMediaQuery } from '@material-ui/core';
import { MenuIcon } from '@material-ui/data-grid';

import { DrawerContext } from '../../App';
import { Logo } from '../../imgs/logo';
import { DRAWER_WIDTH } from '../../constants/sizing-constants';
import styles from './Navbar.module.css'
import { SearchBar } from '../SearchBar';
import { RootState } from '../../store/thunks/store';

import { UserSignInStatus, signCurrentUserOut } from '../../store/thunks/auth-thunks';
import { setThemingMode, setCommonBackdropOn, setCommonBackdropOff } from '../../store/thunks/components-thunks';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            zIndex: theme.zIndex.drawer + 1,
        },
        appBarShift: {
            width: `calc(100% - ${DRAWER_WIDTH}px)`,
            marginLeft: DRAWER_WIDTH,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        hide: {
            display: 'none',
        },
    }),
);

type SliderState = number | boolean

interface Props {
    setDrawerState: (isOpen: boolean) => void
}

/** 
 * Component that renders navbar with: films/people/planets tabs, mainlogo, searchinput and login button-link.
 * It also switches the sidebar open and emits the main screen shrinking.
 */
export const Navbar: React.FC<Props> = ({
    setDrawerState
}) => {
    const history = useHistory()
    const dispatch = useDispatch();

    const [value, setValue] = useState<SliderState>(false);
    const location = useLocation();

    const redirectLink = useSelector((state: RootState) => state.moviesStore.redirectLink)

    useEffect(() => {
        if (redirectLink) {
            history.push(redirectLink)
        }
    }, [redirectLink])

    /** Hook that checks an url and sets the slider accordingly */
    useEffect(() => {
        if (location.pathname.includes('/films')) {
            setValue(0)
            setDrawerState(true)
        } else if (location.pathname.includes('/people')) {
            setValue(1)
            setDrawerState(true)
        } else if (location.pathname.includes('/planets')) {
            setValue(2)
            setDrawerState(true)
        } else {
            setValue(false);
            setDrawerState(false)
        }
    }, [location.pathname]);

    /** Function that and sets the slider accordingly */
    const setSliderPosition = (event: React.ChangeEvent<Record<string, never>>, newValue: number) => {
        setDrawerState(true)
        setValue(newValue);
    };

    const materialUIStyles = useStyles();

    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    const isUserSignedIn = useSelector((state: RootState) => state.authState.isUserSignedIn);

    const [toggler, setToggler] = React.useState<boolean>(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setToggler(event.target.checked);
        dispatch(setThemingMode(event.target.checked))
    };

    const themingMode = useSelector((state: RootState) => state.componentsState.mode)

    const { open } = useContext(DrawerContext)

    const isMediaQueryMatch375 = useMediaQuery('(max-width:414px)')

    useEffect(() => {
        if (open && isMediaQueryMatch375) {
            dispatch(setCommonBackdropOn())
        } else {
            dispatch(setCommonBackdropOff())
        }
    }, [open, isMediaQueryMatch375])

    const appbarPersistentMode = clsx(materialUIStyles.appBar, { [materialUIStyles.appBarShift]: open })
    const appbarPermanentMode = clsx(materialUIStyles.appBar)

    return (
        <AppBar
            className={isMediaQueryMatch375 ? appbarPersistentMode : appbarPermanentMode}
            position="fixed"
        >
            <Toolbar>
                {
                    !isMediaQueryMatch375 ?
                        <Tabs aria-label="simple tabs" onChange={setSliderPosition} value={value}>
                            <Tab component={NavLink} label="Films" to="/films" {...a11yProps(0)} />
                            <Tab component={NavLink} label="Characters" to="/people" {...a11yProps(1)} />
                            <Tab component={NavLink} label="Planets" to="/planets" {...a11yProps(2)} />
                        </Tabs>
                        :
                        <IconButton
                            aria-label="open drawer"
                            className={clsx(materialUIStyles.menuButton, open && materialUIStyles.hide)}
                            color="inherit"
                            edge="start"
                            onClick={() => {
                                setDrawerState(true)
                                // history.push('/films') 
                            }}
                        >
                            <MenuIcon />
                            {/* {!location.pathname.includes('/create-film-entry') || !location.pathname.includes('?edit=1')) && } */}
                        </IconButton>
                }
                <Typography className={styles.title} variant="h6">
                    <Link className={styles.cancelLinkStyles} to="/"><Logo color={themingMode ? '#fff200' : '#fff'} /></Link>
                </Typography>

                <div>
                    <Switch
                        checked={toggler}
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        name="themingToggler"
                        onChange={handleChange}
                    />
                </div>
                {!isMediaQueryMatch375 &&
                    <>
                        <SearchBar />
                        {isUserSignedIn === UserSignInStatus.Authorised
                            ? <Button color="inherit" onClick={() => dispatch(signCurrentUserOut())}>Logout</Button>
                            : <Button color="inherit" onClick={() => history.push('/login')}>Login</Button>
                        }
                    </>
                }
            </Toolbar>
        </AppBar>
    )
}
