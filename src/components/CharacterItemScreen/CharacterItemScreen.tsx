import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import {
    createStyles,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

import { Params } from '../../models/query-params'

import * as actionCreators from '../../store/action-creators/action-creators'
import { loadCharacterItemData } from '../../api/services/load-characters-data';
import { RootState } from '../../store/store';

const useStyles = makeStyles(() =>
    createStyles({
        table: {
            width: "100%",
        },
        tenthWidth: {
            width: "10%",
        },
    }),
);

/** Component that renders a chosen character's data */
export const CharacterItemScreen: React.FC = () => {
    const materialUIStyles = useStyles()
    const history = useHistory()
    const queryParam = useParams<Params>()
    const dispatch = useDispatch()

    /** 
     * Hook that triggers person's entry loading if there's one existing.
    */
    useEffect(() => {
        dispatch(actionCreators.setCommonBackdropOff())
        return loadCharacterItemData(queryParam.id, () => { history.push('/not-found') })
    }, [queryParam.id])

    
    /** Variable to check if there's any person item loaded in the store */
    const character = useSelector((state: RootState) => state.charactersStore.characterItem);

    /** If a user got back from another tab pastes an ID of a current entry */
    useEffect(() => {
        if (character && !queryParam.id) {
            history.replace(`/people/${character.docId}`)
        }
    }, [queryParam.id])

    /** If there's no character item show nothing */
    if (!character) {
        return null
    }

    return (
        <>
            <TableContainer component={Paper}>
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
                            <TableCell align="left" className={materialUIStyles.tenthWidth}><strong>Skincolor: </strong></TableCell>
                            <TableCell align="center">{character.skinColor}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}



