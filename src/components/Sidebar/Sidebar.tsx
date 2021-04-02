/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { 
    Divider, 
    IconButton, 
    List, 
    ListItem, 
    ListItemIcon, 
    ListItemText, 
    Theme, 
    useMediaQuery, 
    useTheme 
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import PublicIcon from '@material-ui/icons/Public';
import FaceIcon from '@material-ui/icons/Face';
import MovieIcon from '@material-ui/icons/Movie';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { SearchBar } from '../SearchBar';
import { DrawerContext } from '../../App';
import { DRAWER_WIDTH } from '../../constants/sizing-constants'

import { signCurrentUserOut, UserSignInStatus } from '../../store/redux-slices/auth';
import { RootState } from '../../store/store-types';

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
 * @param children List of items to render inside.
 * @param setDrawerState Function to update the state of open sidebar.
 */
export const Sidebar: React.FC<SidebarProps> = ({ children, setDrawerState }: SidebarProps) => {
    const materialUIStyles = useStyles();
    const theme = useTheme();
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
                        }
                        }>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <ListItem activeClassName={materialUIStyles.activeLink} component={NavLink} to="/star-wars-react/films" button>
                            <ListItemIcon><MovieIcon /></ListItemIcon>
                            <ListItemText primary='Movies' />
                        </ListItem>
                        <ListItem activeClassName={materialUIStyles.activeLink} component={NavLink} to="/star-wars-react/people" button>
                            <ListItemIcon><FaceIcon /></ListItemIcon>
                            <ListItemText primary='Characters' />
                        </ListItem>
                        <ListItem activeClassName={materialUIStyles.activeLink} component={NavLink} to="/star-wars-react/planets" button>
                            <ListItemIcon><PublicIcon /></ListItemIcon>
                            <ListItemText primary='Planets' />
                        </ListItem>
                        <Divider />
                        {isUserSignedIn === UserSignInStatus.Authorised
                            ?
                            <ListItem button>
                                <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                                <ListItemText onClick={() => dispatch(signCurrentUserOut())} primary='Log out'  />
                            </ListItem>
                            :
                            <ListItem component={NavLink} to="/star-wars-react/login" button> 
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
