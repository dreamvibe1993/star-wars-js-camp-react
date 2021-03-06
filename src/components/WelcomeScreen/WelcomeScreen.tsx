import React from 'react';
import { 
    Backdrop, 
    Button, 
    Card, 
    CardActionArea, 
    CardActions, 
    CardContent, 
    CardMedia, 
    createStyles, 
    Fade, 
    makeStyles, 
    Modal, 
    Theme, 
    Typography, 
    useMediaQuery 
} from '@material-ui/core';

import { YellowLogo } from '../../imgs/logo';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        spacing: {
            padding: theme.spacing(5)
        },
        media: {
            height: 500,
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            '& a': {
                color: 'red'
            },
        },
    }),
);

/** Welcoming default screen. Rendered while nothing is chosen yet. */
export const WelcomeScreen: React.FC = () => {
    const [open, setOpen] = React.useState(false);
    const materialUIStyles = useStyles()

    const handleInfoModalOpen = () => {
        setOpen(true);
    };

    const handleInfoModalClose = () => {
        setOpen(false);
    };

    const isMediaQueryMatch375 = useMediaQuery('(max-width:414px)')

    return (
        <>
            <div>
                <Modal
                    aria-describedby="transition-modal-description"
                    aria-labelledby="transition-modal-title"
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                    className={materialUIStyles.modal}
                    onClose={handleInfoModalClose}
                    open={open}
                    closeAfterTransition
                >
                    <Fade in={open}>
                        <div className={materialUIStyles.paper}>
                            <Typography variant="h4">
                                Psst...
                            </Typography>
                            <Typography>Hello there!</Typography>
                            <Typography component="p" variant="body2">
                                My name is <a href="https://t.me/GEORGIY_APRAKSIN">George</a>????<br />
                                This app was made during my internship in <a href="https://www.interesnee.ru/">INTERESNEE JS WINTER CAMP 2021</a>.
                            </Typography>
                            <Typography>
                                Stack:
                            </Typography>
                                <ul>
                                    <li>
                                        <a href="https://www.typescriptlang.org/">TypeScript</a>
                                    </li>
                                    <li>
                                        <a href="https://ru.reactjs.org/">React 17.0.2</a>
                                    </li>
                                    <li>
                                        <a href="https://redux-toolkit.js.org/">Redux-Toolkit</a>
                                    </li>
                                    <li>
                                        <a href="https://material-ui.com/">Material-UI</a>
                                    </li>
                                    <li>
                                        <a href="https://firebase.google.com/docs/firestore">Cloud Firestore</a>
                                    </li>
                                    <li>
                                        <a href="https://formik.org/docs/overview">Formik & Yup</a>
                                    </li>
                                </ul>
                            <Typography component="p" variant="body2">
                                My other portfolio and whatnots:
                            </Typography>
                                <ul>
                                    <li>
                                        <a href="https://github.com/dreamvibe1993">Git Hub</a>
                                    </li>
                                    <li>
                                        <a href="https://soundcloud.com/mister-dreamvibe">SoundCloud</a>
                                    </li>
                                </ul>
                            <Typography>
                                <a href="https://ekaterinburg.hh.ru/resume/416ea42dff089785ce0039ed1f345831765647">Hire me</a>????
                            </Typography>
                        </div>
                    </Fade>
                </Modal>
            </div>
            <Card >
                <CardActionArea>
                    <CardMedia
                        className={materialUIStyles.media}
                        image="https://static0.srcdn.com/wordpress/wp-content/uploads/2019/05/Star-Wars-Movies.jpg?q=50&fit=crop&w=960&h=500"
                        title="Welcome"
                    />
                    <CardContent>
                        <YellowLogo height={isMediaQueryMatch375 ? "70%" : "40%"} width={isMediaQueryMatch375 ? "70%" : "40%"} />
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button color="inherit" onClick={handleInfoModalOpen} size="small">
                        About
                    </Button>
                </CardActions>
            </Card>
        </>
    )
}