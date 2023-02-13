/**
 * Table list of models, available columns are Model Name, Slug, File used for training, 
 * Status, Created at, Actions
 */

import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@material-ui/core";
import { isEmpty } from "lodash";
import ModelTableRow from "./TableRow";
import NoResults from "../../NoResults";
import { useSelector } from '../../../store';
import Loader from './Loader';
import { reducerStatus } from '../../../constants/reducer';


const ModelList = () => {
    const {
        results: { allIds, byId },
        status,
    } = useSelector((state) => state.fineTunedModels);

    return (
        <Loader isLoading={status === reducerStatus.loading}>
            <>
                {isEmpty(allIds) && <NoResults />}
                {!isEmpty(allIds) && (
                    <TableContainer component={Paper} sx={{ mb: 4 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Model Name</TableCell>
                                    <TableCell align="left">Slug</TableCell>
                                    <TableCell align="left">File used for training</TableCell>
                                    <TableCell align="left">Status</TableCell>
                                    <TableCell align="left">Created at</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {allIds.map((row) => <ModelTableRow key={`model-${row}`} data={byId[row]} />)}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </>
        </Loader>
    )
}

export default ModelList;