import React from 'react';
import {
    createStyles,
    makeStyles,
    Paper,
    Theme,
    Typography
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        spacing: {
            padding: theme.spacing(5)
        }
    }),
);

/** Screen to be shown if there was any error caught */
export const ErrorScreen: React.FC = () => {
    const classes = useStyles()
    return (
        <>
            <Paper className={classes.spacing}>
                <Typography component="h2" variant="h3" gutterBottom>Sorry, something went wrong!</Typography>
                <Typography variant="body1" gutterBottom>
                    Contact us immediately! 
                </Typography>
                    <a href="mailto:fakemail@yoursite.com">Email</a>
            </Paper>
        </>
    )
}