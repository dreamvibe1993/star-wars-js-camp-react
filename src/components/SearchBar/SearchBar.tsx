import React from 'react'
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';

import { 
    makeStyles, 
    Theme, 
    createStyles, 
    fade, 
    InputBase 
} from '@material-ui/core';

import { SearchIcon } from '@material-ui/data-grid';
import { NavbarSearchYupValScheme } from '../../models/yup-validation-schemas';

import { searchMovieEntry } from '../../store/thunks/movies-thunks';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(1),
                width: 'auto',
            },
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
        inputRoot: {
            color: 'inherit',
        },
    }),
);

const validationSchema = NavbarSearchYupValScheme;

export const SearchBar: React.FC = () => {
    const materialUIStyles = useStyles();
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            title: '',
        },
        validationSchema,
        onSubmit: (values) => {
            dispatch(searchMovieEntry(values.title))
        }
    })
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={materialUIStyles.search}>
                <div className={materialUIStyles.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    classes={{
                        root: materialUIStyles.inputRoot,
                        input: materialUIStyles.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    name="title"
                    onChange={formik.handleChange}
                    placeholder="Search..."
                />
            </div>
        </form>
    )
}