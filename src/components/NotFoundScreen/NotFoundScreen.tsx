import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    createStyles,
    makeStyles,
    Theme,
    Typography
} from '@material-ui/core';

import { setMovieLoadingPending } from '../../store/thunks/movies-thunks';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        spacing: {
            padding: theme.spacing(5)
        },
        media: {
            height: 600,
        }
    }),
);

/** Component that renders only if no entry is found */
export const NotFoundScreen: React.FC = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setMovieLoadingPending(true))
    }, [])
    return (
        <>
            <Card>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image='https://img1.looper.com/img/gallery/the-saddest-star-wars-moments-ever/intro-1584389780.jpg'
                        title="BOOOOHOOOOOOOOO!!!!!!! :*O"
                    />
                    <CardContent>
                        <Typography variant="h2" gutterBottom>
                            404!
                            </Typography>
                        <Typography color="textSecondary" component="p" variant="body2">
                            Should we try again?
                            </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    )
}
