import { makeStyles, Theme, createStyles, Paper, TextField, Button, Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { DRAWER_WIDTH } from '../../constants/sizing-constants';
import { accCreateYupValScheme } from '../../models/yup-validation-schemas';
import { RootState, UserSignInStatus } from '../../store/reducer';
import { createUserAccount, signIn } from '../../store/thunks/auth-thunks';
import styles from './RegistrationPage.module.css'

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
        }
    }),
);

const validationSchema = accCreateYupValScheme;

export const RegistrationPage: React.FC = () => {
    const materialUIStyles = useStyles();
    const dispatch = useDispatch();
    const isUserAuthorized = useSelector((state: RootState) => state.authState.isUserSignedIn)
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            repeatPassword: '',
        },
        validationSchema,
        onSubmit: (values) => {
            if (values.password !== values.repeatPassword) {
                formik.setFieldError('password', 'Passwords don\'t match!')
            }
            dispatch(createUserAccount({ email: values.email, password: values.password }))
        },
    });
    if (isUserAuthorized === UserSignInStatus.Authorised) {
        return <Redirect to="/login" />
    }
    return (
        <div className={styles.fullWidth}>
            <form className={styles.thirdWidth} onSubmit={formik.handleSubmit}>
                <Paper className={styles.flexColumn}>
                    <Typography component="h2" style={{marginTop: '15px'}} variant="h4">Create an account</Typography>
                    <TextField
                        className={materialUIStyles.spacing}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        id="email"
                        label="Type your email"
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
                        label="Type your password"
                        name="password"
                        onChange={formik.handleChange}
                        type="password"
                        value={formik.values.password}
                        variant="outlined"
                    />
                    <TextField
                        className={materialUIStyles.spacing}
                        error={formik.touched.repeatPassword && Boolean(formik.errors.repeatPassword)}
                        helperText={formik.touched.repeatPassword && formik.errors.repeatPassword}
                        id="repeatPassword"
                        label="Repeat your password"
                        name="repeatPassword"
                        onChange={formik.handleChange}
                        type="password"
                        value={formik.values.repeatPassword}
                        variant="outlined"
                    />
                    <Button className={materialUIStyles.spacing} color="primary" type="submit" variant="contained">
                        Submit
                </Button>
                </Paper>
            </form>
            <Typography color="textSecondary" variant="subtitle1">
                Already have an account? <NavLink style={{ color: "red" }} to="/login">Log in!</NavLink>
            </Typography>
        </div>
    )
}