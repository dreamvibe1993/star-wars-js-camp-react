import React from 'react';
import { createStyles, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        spacing: {
            padding: theme.spacing(5)
        }
    }),
);

/** Welcoming default screen. Rendered while nothing is chosen yet. */
export const WelcomeScreen: React.FC = () => {

    const materialUIStyles = useStyles()
    return (
        <>
            <Paper className={materialUIStyles.spacing}>
                <Typography component="h2" variant="h3" gutterBottom>Welcome!</Typography>
                <Typography variant="body1" gutterBottom>
                    This is a Star Wars geek lair. Please feel free to pick one of our three menu items to see the info you want to see.
                </Typography>
                <Typography variant="body1" gutterBottom><NavLink to="/films">Films</NavLink> is the comprehensive collection of all star wars movies.</Typography>
                <Typography variant="body1" gutterBottom><NavLink to="/people">People</NavLink> is all characters participated in movies.</Typography>
                <Typography variant="body1" gutterBottom><NavLink to="/planets">Planets</NavLink> are... planets!</Typography>
                <Typography variant="body1" gutterBottom>
                    In the menu you can see the whole information just by clicking on one of the menu items. Good luck!
                </Typography>
            </Paper>
        </>
    )
}