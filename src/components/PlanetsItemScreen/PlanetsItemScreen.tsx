import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import {
    createStyles,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
} from '@material-ui/core';

import { Params } from '../../models/query-params';

import * as actionCreators from '../../store/action-creators/action-creators'
import { loadPlanetItemData } from '../../api/services/load-planets-data';
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

/** Component that renders a chosen planet's data */
export const PlanetsItemScreen: React.FC = () => {
    const history = useHistory();
    const materialUIStyles = useStyles();
    const queryParam = useParams<Params>();
    const planet = useSelector((state: RootState) => state.dataStore.planetItem);
    const dispatch = useDispatch()

    /** Hook that triggers planet's entry loading. */
    useEffect(() => {
        dispatch(actionCreators.setCommonBackdropOff())
        return loadPlanetItemData(queryParam.id, () => { history.push('/not-found') });
    }, [queryParam.id])

    /** If a user got back from another tab pastes an ID of a current entry */
    useEffect(() => {
        if (planet && !queryParam.id) {
            history.replace(`/planets/${planet.docId}`)
        }
    }, [queryParam.id])

    /** If there's no planet item show nothing */
    if (!planet) {
        return null;
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table className={materialUIStyles.table} size="medium">
                    <TableBody>
                        <TableRow >
                            <TableCell align="left" className={materialUIStyles.tenthWidth}><strong>Name: </strong></TableCell>
                            <TableCell align="center"><h1>{planet.name}</h1></TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell align="left" className={materialUIStyles.tenthWidth}><strong>Climate: </strong></TableCell>
                            <TableCell align="center">{planet.climate}</TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell align="left" className={materialUIStyles.tenthWidth}><strong>Diameter: </strong></TableCell>
                            <TableCell align="center">{planet.diameter}</TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell align="left" className={materialUIStyles.tenthWidth}><strong>Gravity: </strong></TableCell>
                            <TableCell align="center">{planet.gravity}</TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell align="left" className={materialUIStyles.tenthWidth}><strong>Orbital period: </strong></TableCell>
                            <TableCell align="center">{planet.orbitalPeriod}</TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell align="left" className={materialUIStyles.tenthWidth}><strong>Population: </strong></TableCell>
                            <TableCell align="center">{planet.population}</TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell align="left" className={materialUIStyles.tenthWidth}><strong>Rotation period: </strong></TableCell>
                            <TableCell align="center">{planet.rotationPeriod}</TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell align="left" className={materialUIStyles.tenthWidth}><strong>Surface water: </strong></TableCell>
                            <TableCell align="center">{planet.surfaceWater}</TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell align="left" className={materialUIStyles.tenthWidth}><strong>Terrain: </strong></TableCell>
                            <TableCell align="center">{planet.terrain}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
