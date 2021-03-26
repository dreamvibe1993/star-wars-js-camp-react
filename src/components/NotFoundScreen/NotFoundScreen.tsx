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

/** Component that renders only if no entry is found */
export const NotFoundScreen: React.FC = () => {
    const classes = useStyles()
    return (
        <>
            <Paper className={classes.spacing}>
                <Typography component="h2" variant="h3" gutterBottom>We are terribly sorry!</Typography>
                <Typography variant="body1" gutterBottom>
                    But there is no such entry.
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>Maybe try again...?</strong>
                </Typography>
            </Paper>
        </>
    )
}