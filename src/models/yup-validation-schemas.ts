import * as yup from 'yup';

/** Yup validation scheme of create-movie-form in the according component */
export const createMovieItemYupValScheme = yup.object({
    title: yup
        .string()
        .required('Title is required'),
    producer: yup
        .string()
        .required('Type the producer\'s name'),
    releaseDate: yup
        .string()
        .required('Release date is required!'),
    director: yup
        .string()
        .required('Type the director\'s name'),
    openingCrawl: yup
        .string()
        .required('Where is the opening crawl?'),
    charactersPKs: yup
        .array()
        .required('Choose chars'),
    planetsPKs: yup
        .array()
        .required('Choose planets'),
});

/** Yup validation scheme of login page form */
export const loginPageYupValScheme = yup.object({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(6, 'Password should be of minimum 6 characters length')
        .required('Password is required'),
});

/** Yup validation scheme of create an account form */
export const accCreateYupValScheme = yup.object({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(6, 'Password should be of minimum 6 characters length')
        .required('Password is required'),
    repeatPassword: yup
        .string()
        .min(6, 'Password should be of minimum 6 characters length')
        .required('Please repeat your password'),
});

/** Yup validation scheme of edit movie form */
export const movieEditYupValScheme = yup.object({
    title: yup
        .string()
        .required('Title is required'),
    producer: yup
        .string()
        .required('Type the producer\'s name'),
    releaseDate: yup
        .string()
        .required('Release date is required!'),
    director: yup
        .string()
        .required('Type the director\'s name'),
    openingCrawl: yup
        .string()
        .required('Where is the opening crawl?'),
});

/** Yup validation scheme of navbar's searchbar */
export const NavbarSearchYupValScheme = yup.object({
    title: yup
        .string()
        .required('Title is required')
});