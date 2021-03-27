import React from 'react';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import {
    Button,
    createStyles,
    makeStyles,
    Paper,
    Theme
} from '@material-ui/core';

import { signIn } from '../../api/services/auth';

import styles from './LoginPage.module.css'
import { loginPageYupValScheme } from '../../models/yup-validation-schemas';
import { DRAWER_WIDTH } from '../../constants/sizing-constants';
import { setCommonBackdropOff } from '../../store/reducer';

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
    }),
);

const validationSchema = loginPageYupValScheme;

/** Login page interface */
export const LoginPage: React.FC = () => {
    const materialUIStyles = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: (values) => {
            signIn(values.email, values.password)
                .then(() => {
                    dispatch(setCommonBackdropOff());
                    history.push('/');
                })
                .catch((error) => {
                    dispatch(setCommonBackdropOff());
                    if (error.code === 'auth/user-not-found') {
                        formik.setFieldError('email', error.message)
                    } else if (error.code === 'auth/wrong-password') {
                        formik.setFieldError('password', error.message)
                    }
                })
        },
    });

    return (
        <div className={styles.fullWidth}>
            <form className={styles.thirdWidth} onSubmit={formik.handleSubmit}>
                <Paper className={styles.flexColumn}>
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
            </form>
        </div>
    )
}