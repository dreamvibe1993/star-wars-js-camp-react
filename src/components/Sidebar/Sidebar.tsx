import React, { useContext } from 'react';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import { DRAWER_WIDTH } from '../../constants/sizing-constants'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { DrawerContext } from '../../App';
import { Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, Theme, useMediaQuery, useTheme } from '@material-ui/core';
import { NavLink, useHistory } from 'react-router-dom';
import PublicIcon from '@material-ui/icons/Public';
import FaceIcon from '@material-ui/icons/Face';
import MovieIcon from '@material-ui/icons/Movie';
import { SearchBar } from '../SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, UserSignInStatus } from '../../store/reducer';
import { signCurrentUserOut } from '../../store/thunks/auth-thunks';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawer: {
            width: DRAWER_WIDTH,
            flexShrink: 0,
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
        drawerPaper: {
            width: DRAWER_WIDTH,
        },
        activeLink: {
            backgroundColor: 'rgba(0,0,0, .1)'
        }
    }),
);
interface SidebarProps {
    children: JSX.Element[] | JSX.Element;
    setDrawerState: (isOpen: boolean) => void
}

/** 
 * Component that renders THE sidebar. 
 * Children are list of items to render inside.
 */
export const Sidebar: React.FC<SidebarProps> = ({ children, setDrawerState }: SidebarProps) => {
    const materialUIStyles = useStyles();
    const theme = useTheme();
    const history = useHistory()
    const dispatch = useDispatch()
    const { open } = useContext(DrawerContext)
    const isMediaQueryMatch375 = useMediaQuery('(max-width:414px)')
    const isUserSignedIn = useSelector((state: RootState) => state.authState.isUserSignedIn)
    return (
        <Drawer
            classes={{
                paper: materialUIStyles.drawerPaper,
            }}
            className={materialUIStyles.drawer}
            open={open}
            variant="persistent"
        >
            {isMediaQueryMatch375 ?
                <>
                    <div className={materialUIStyles.drawerHeader}>
                        <IconButton onClick={() => {
                            setDrawerState(false)
                            // history.push('/')
                        }
                        }>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <ListItem activeClassName={materialUIStyles.activeLink} component={NavLink} to="/films" button>
                            <ListItemIcon><MovieIcon /></ListItemIcon>
                            <ListItemText primary='Movies' />
                        </ListItem>
                        <ListItem activeClassName={materialUIStyles.activeLink} component={NavLink} to="/people" button>
                            <ListItemIcon><FaceIcon /></ListItemIcon>
                            <ListItemText primary='Characters' />
                        </ListItem>
                        <ListItem activeClassName={materialUIStyles.activeLink} component={NavLink} to="/planets" button>
                            <ListItemIcon><PublicIcon /></ListItemIcon>
                            <ListItemText primary='Planets' />
                        </ListItem>
                        <Divider />
                        {isUserSignedIn === UserSignInStatus.Authorised
                            ?
                            <ListItem button>
                                <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                                <ListItemText primary='Log out' onClick={() => dispatch(signCurrentUserOut())}  />
                            </ListItem>
                            :
                            <ListItem component={NavLink} to="/login" button> 
                                <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                                <ListItemText primary='Log in' />
                            </ListItem>
                        }
                        <ListItem>
                            <SearchBar />
                        </ListItem>
                    </List>
                    <Divider />
                </>
                :
                <Toolbar />
            }
            { children}
        </Drawer >
    );
}
