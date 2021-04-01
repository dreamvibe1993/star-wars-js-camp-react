/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';

import {
    Card,
    CardActionArea,
    CardMedia,
    createStyles,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Theme,
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Params } from '../../../models/query-params'

import { loadCharacterItem } from '../../../store/redux-slices/characters';
import { RootState } from '../../../store/store-types';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        table: {
            width: "100%",
            minHeight: "550px",
            height: "auto",
        },
        tenthWidth: {
            width: "10%",
        },
        tableContainer: {
            display: 'flex',
            [theme.breakpoints.down('sm')]: {
                flexDirection: 'column'
            },
        },
        spinnerContainer: {
            width: '100%',
            minHeight: "550px",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        imgContainer: {
            height: '450px',
            width: '450px',
            margin: '5px',
            backgroundPosition: 'left',
            backgroundSize: '70%',
        },
        card: {
            width: 'auto',
            maxHeight: '600px',
            maxWidth: '350px',
            height: 'auto',
            boxShadow: 'none'
        },
    }),
);

/** Component that renders a chosen character's data */
export const CharacterItemScreen: React.FC = () => {
    const materialUIStyles = useStyles()
    const history = useHistory()
    const queryParam = useParams<Params>()
    const dispatch = useDispatch()

    /** Variable to check if there's any person item loaded in the store */
    const character = useSelector((state: RootState) => state.charactersStore.characterItem);

    /**  Hook that triggers person's entry loading if there's one existing. */
    useEffect(() => {
        if (character && !queryParam.id) {
            history.replace(`/people/${character.docId}`)
        }
        dispatch(loadCharacterItem(queryParam.id))
    }, [queryParam.id])

    const isCharacterLoadingPending = useSelector((state: RootState) => state.charactersStore.isCharacterLoadingPending)

    /** If no character's doc found and loading is over render 'not-found' */
    if (!character && !isCharacterLoadingPending) {
        return <Redirect to="/not-found" />
    }

    /** Spinner while loading */
    if (isCharacterLoadingPending) {
        return (
            <>
                <div className={materialUIStyles.spinnerContainer} >
                    <CircularProgress color="inherit" />
                </div>
            </>
        )
    }

    /** If there's a match render the data */
    return character && (
            <TableContainer className={materialUIStyles.tableContainer} component={Paper}>
                <Card className={materialUIStyles.card}>
                    <CardActionArea>
                        <CardMedia
                            className={materialUIStyles.imgContainer}
                            image={character.image || 'https://via.placeholder.com/728x1000?text=No+image'}
                            title={character.name}
                        />
                    </CardActionArea>
                </Card>
                <Table className={materialUIStyles.table} size="medium">
                    <TableBody>
                        <TableRow >
                            <TableCell align="left" className={materialUIStyles.tenthWidth}><strong>Name: </strong></TableCell>
                            <TableCell align="center"><h1>{character.name}</h1></TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell align="left" className={materialUIStyles.tenthWidth}><strong>Date of the birth: </strong></TableCell>
                            <TableCell align="center">{character.birthYear}</TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell align="left" className={materialUIStyles.tenthWidth}><strong>Color of the eyes: </strong></TableCell>
                            <TableCell align="center">{character.eyeColor}</TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell align="left" className={materialUIStyles.tenthWidth}><strong>Sex: </strong></TableCell>
                            <TableCell align="center">{character.gender}</TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell align="left" className={materialUIStyles.tenthWidth}><strong>Hair color: </strong></TableCell>
                            <TableCell align="center">{character.hairColor}</TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell align="left" className={materialUIStyles.tenthWidth}><strong>Homeworld: </strong></TableCell>
                            <TableCell align="center">{character.homeworld}</TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell align="left" className={materialUIStyles.tenthWidth}><strong>Weight: </strong></TableCell>
                            <TableCell align="center">{character.mass}</TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell align="left"  className={materialUIStyles.tenthWidth} style={{borderBottom: 'none'}}><strong>Skincolor: </strong></TableCell>
                            <TableCell align="center" style={{borderBottom: 'none'}}>{character.skinColor}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
    );
}
