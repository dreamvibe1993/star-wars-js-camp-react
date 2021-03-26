import React, { useContext } from 'react';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import { DRAWER_WIDTH } from '../../constants/sizing-constants'

import { DrawerContext } from '../../App';

const useStyles = makeStyles(() =>
    createStyles({
        drawer: {
            width: DRAWER_WIDTH,
            flexShrink: 0,
        },
        drawerPaper: {
            width: DRAWER_WIDTH,
        },
    }),
);
interface SidebarProps {
    children: JSX.Element[] | JSX.Element;
}

/** 
 * Component that renders THE sidebar. 
 * Children are list of items to render inside.
 */
export const Sidebar: React.FC<SidebarProps> = ({ children }: SidebarProps) => {
    const materialUIStyles = useStyles();

    const { open } = useContext(DrawerContext)

    return (
        <Drawer
            classes={{
                paper: materialUIStyles.drawerPaper,
            }}
            className={materialUIStyles.drawer}
            open={open}
            variant="persistent"
        >
            <Toolbar />
            {children}
        </Drawer>
    );
}
