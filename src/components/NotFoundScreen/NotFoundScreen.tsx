import React, { useEffect } from 'react';
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    createStyles,
    makeStyles,
    Paper,
    Theme,
    Typography
} from '@material-ui/core';
import { signCurrentUserOut } from '../../store/thunks/auth-thunks';
import { setMovieLoadingPending } from '../../store/reducer';
import { useDispatch } from 'react-redux';

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