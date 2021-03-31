/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Container,
    createStyles,
    makeStyles,
    Paper,
    Theme,
    Typography} from '@material-ui/core';

import { loginPageYupValScheme } from '../../models/yup-validation-schemas';
import { DRAWER_WIDTH } from '../../constants/sizing-constants';

import { signCurrentUserOut, signIn, UserSignInStatus } from '../../store/thunks/auth-thunks';
import { RootState } from '../../store/thunks/store';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: 0,
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
        contentShift: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: DRAWER_WIDTH,
        },
        spacing: {
            margin: theme.spacing(2),
        },
        media: {
            height: 400,
        },
        flexColumn: {
            display: 'flex',
            flexDirection: 'column',
        },
        modalAlike: {
            width: '295px',
            margin: '0 auto',
        }
    }),
);

const validationSchema = loginPageYupValScheme;

/** Login page interface */
export const LoginPage: React.FC = () => {
    const materialUIStyles = useStyles();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: (values) => {
            dispatch(signIn({ email: values.email, password: values.password }))
        },
    });

    const isUserAuthorized = useSelector((state: RootState) => state.authState.isUserSignedIn)
    const userEmail = useSelector((state: RootState) => state.authState.userEmail)
    const passwordErrorMessage = useSelector((state: RootState) => state.authState.passwordErrorCodeMsg)
    const emailErrorMessage = useSelector((state: RootState) => state.authState.emailErrorCodeMsg)


    useEffect(() => {
        if (passwordErrorMessage) {
            formik.setFieldError('password', passwordErrorMessage)
        }
        if (emailErrorMessage) {
            formik.setFieldError('email', emailErrorMessage)
        }
    }, [passwordErrorMessage, emailErrorMessage])


    if (isUserAuthorized === UserSignInStatus.Authorised) {
        return (
            <div className={materialUIStyles.modalAlike}>
                <Card>
                    <CardActionArea>
                        <CardMedia
                            className={materialUIStyles.media}
                            image='https://i.pinimg.com/736x/66/51/fb/6651fbdbd1891d94bb29ba120c8d315c.jpg'
                            title="Welcome"
                        />
                        <CardContent>
                            <Typography component="h2" variant="h5" gutterBottom>
                                Welcome {userEmail}!
                            </Typography>
                            <Typography color="textSecondary" component="p" variant="body2">
                                We are glad to meet you.
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <Button color="inherit" onClick={() => dispatch(signCurrentUserOut())} size="small">
                            Log out
                        </Button>
                    </CardActions>
                </Card>
            </div>
        )
    }

    return (
        <Container>
            <form className={materialUIStyles.modalAlike} onSubmit={formik.handleSubmit}>
                <Paper className={materialUIStyles.flexColumn}>
                    <TextField
                        className={materialUIStyles.spacing}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        id="email"
                        label="Email"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        variant="outlined"
                    />
                    <TextField
                        className={materialUIStyles.spacing}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        id="password"
                        label="Password"
                        name="password"
                        onChange={formik.handleChange}
                        type="password"
                        value={formik.values.password}
                        variant="outlined"
                    />
                    <Button className={materialUIStyles.spacing} color="primary" type="submit" variant="contained">
                        Submit
                    </Button>
                </Paper>
            <Typography color="textSecondary" variant="subtitle1">
                Don't have an account yet? <NavLink style={{ color: "red" }} to="/register">Create an account!</NavLink>
            </Typography>
            </form>
        </Container>

        // </div>
    )
}