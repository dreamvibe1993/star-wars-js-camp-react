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
interface Props {
    error: Error;
}
/** Screen to be shown if there was any error caught */
export const ErrorScreen: React.FC<Props> = ({ error }) => {
    const classes = useStyles()
    return (
        <>
            <Paper className={classes.spacing}>
                <Typography component="h2" variant="h3" gutterBottom>Sorry, something went wrong!</Typography>
                <Typography variant="body1" gutterBottom>
                    Error message:
                </Typography>
                <hr />
                <Typography variant="h6" gutterBottom>
                    "{error.message}"
                </Typography>
                <hr />
                <Typography variant="body1" gutterBottom>
                    Please, <a href="https://t.me/GEORGIY_APRAKSIN">contact me</a> and cite the message above.
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Thank You!
                </Typography>
            </Paper>
        </>
    )
}