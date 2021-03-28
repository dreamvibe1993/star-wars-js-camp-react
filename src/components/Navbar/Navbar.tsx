import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';

import {
    makeStyles,
    Theme,
    createStyles,
    fade
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { signOut } from '../../api/services/auth';
import { searchMovieEntity } from '../../api/services/load-movies-data-api';

import { NavbarSearchYupValScheme } from '../../models/yup-validation-schemas';
import styles from './Navbar.module.css'
import { RootState } from '../../store/store';
import { UserSignInStatus , setCommonBackdropOn, setCommonBackdropOff } from '../../store/reducer';
import { logo } from '../../imgs/logo';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            zIndex: theme.zIndex.drawer + 1,
            backgroundColor: 'black',
        },

        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(1),
                width: 'auto',
            },
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
        inputRoot: {
            color: 'inherit',
        }
    }),
);

const validationSchema = NavbarSearchYupValScheme;

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
    const formik = useFormik({
        initialValues: {
            title: '',
        },
        validationSchema,
        onSubmit: (values) => {
            dispatch(setCommonBackdropOn())
            searchMovieEntity(values.title).then((querySnapshot) => {
                    if (!querySnapshot.empty) {
                        querySnapshot.forEach((querySnapshotItem) => {
                            history.push(`/films/${querySnapshotItem.id}`)
                        })
                    } else {
                        history.push('/not-found')
                    }
                    dispatch(setCommonBackdropOff())
                })
        }
    })
    const [value, setValue] = useState<SliderState>(false);
    const location = useLocation();

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
    

    function signUserOut() {
        signOut()
            .then(() => {
                console.log('Signed Out');
            })
            .catch((error) => {
                console.error(error);
                history.push('/error')
            })
    }

    return (
        <AppBar
            className={clsx(materialUIStyles.appBar)}
            position="fixed"
        >
            <Toolbar>
                <Tabs aria-label="simple tabs" onChange={setSliderPosition} value={value}>
                    <Tab component={NavLink} label="Films" to="/films" {...a11yProps(0)} />
                    <Tab component={NavLink} label="People" to="/people" {...a11yProps(1)} />
                    <Tab component={NavLink} label="Planets" to="/planets" {...a11yProps(2)} />
                </Tabs>
                <Typography className={styles.title} variant="h6">
                    <Link className={styles.cancelLinkStyles} to="/">{logo}</Link>
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <div className={materialUIStyles.search}>
                        <div className={materialUIStyles.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            classes={{
                                root: materialUIStyles.inputRoot,
                                input: materialUIStyles.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            name="title"
                            onChange={formik.handleChange}
                            placeholder="Search…"
                        />
                    </div>
                </form>
                {isUserSignedIn === UserSignInStatus.Authorised
                    ? <Button color="inherit" onClick={() => signUserOut()}>Logout</Button>
                    : <Link className={styles.cancelLinkStyles} to='/login'>
                        <Button color="inherit">Login</Button>
                    </Link>}
            </Toolbar>
        </AppBar>
    )
}
