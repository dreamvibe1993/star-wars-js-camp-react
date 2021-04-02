import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';

import {
    CircularProgress,
    createStyles,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
} from '@material-ui/core';

import { Params } from '../../../models/query-params';

import { loadPlanetItem } from '../../../store/redux-slices/planets';
import { RootState } from '../../../store/store-types';

const useStyles = makeStyles(() =>
    createStyles({
        table: {
            width: "100%",
        },
        tenthWidth: {
            width: "10%",
        },
        spinnerContainer: {
            width: '100%',
            minHeight: "550px",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white'
        }
    }),
);

/** Component that renders a chosen planet's data */
export const PlanetsItemScreen: React.FC = () => {
    const history = useHistory();
    const materialUIStyles = useStyles();
    const queryParam = useParams<Params>();
    const planet = useSelector((state: RootState) => state.planetsStore.planetItem);
    const dispatch = useDispatch()

     /**  Hook that triggers planet's entry loading if there's one existing. */
     useEffect(() => {
         if (planet && !queryParam.id) {
             history.replace(`/star-wars-react/planets/${planet.docId}`)
         }
         dispatch(loadPlanetItem(queryParam.id))
     }, [queryParam.id])
 
     const isPlanetLoadingPending = useSelector((state: RootState) => state.planetsStore.isPlanetLoadingPending)
     
     /** If no planet found - redirect */
     if (!planet && !isPlanetLoadingPending) {
         return <Redirect to="/star-wars-react/not-found" />
     }
     if (isPlanetLoadingPending) {
         return (
             <>
                 <div className={materialUIStyles.spinnerContainer} >
                     <CircularProgress color="inherit" />
                 </div>
             </>
         )
     }
     return planet && (
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
