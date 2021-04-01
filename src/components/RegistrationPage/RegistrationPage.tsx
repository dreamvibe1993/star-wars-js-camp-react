/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';

import { 
    makeStyles, 
    Theme, 
    createStyles, 
    Paper, 
    TextField, 
    Button, 
    Typography 
} from '@material-ui/core';

import { DRAWER_WIDTH } from '../../constants/sizing-constants';
import styles from './RegistrationPage.module.css'
import { accCreateYupValScheme } from '../../models/yup-validation-schemas';

import { createUserAccount, UserSignInStatus } from '../../store/redux-slices/auth';
import { RootState } from '../../store/store-types';

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
        modalAlike: {
            width: '330px',
            margin: '0 auto',
        }
    }),
);

const validationSchema = accCreateYupValScheme;

/** Component rendering registration's form */
export const RegistrationPage: React.FC = () => {
    const materialUIStyles = useStyles();
    const dispatch = useDispatch();
    const isUserAuthorized = useSelector((state: RootState) => state.authState.isUserSignedIn)
    const emailErrorMessage = useSelector((state: RootState) => state.authState.emailErrorCodeMsg)
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
            } else {
                dispatch(createUserAccount({ email: values.email, password: values.password }))
            }
        },
    });

    /** If there was error set an error */
    useEffect(() => {
        if (emailErrorMessage) {
            formik.setFieldError('email', emailErrorMessage)
        }
    }, [emailErrorMessage])
    
    /** If user logged in - redirect */
    if (isUserAuthorized === UserSignInStatus.Authorised) {
        return <Redirect to="/login" />
    }
    return (
        <form className={materialUIStyles.modalAlike} onSubmit={formik.handleSubmit}>
            <Paper className={styles.flexColumn}>
                <Typography component="h2" style={{ marginTop: '15px' }} variant="h4">Create an account</Typography>
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
            <Typography color="textSecondary" variant="subtitle1">
                Already have an account? <NavLink style={{ color: "red" }} to="/login">Log in!</NavLink>
            </Typography>
        </form>
    )
}