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
import { MODEL_STATUS } from "../../../constants/fineTunedModels";

const rows = [
    {
        id: 111,
        name: "Some special model",
        slug: 'some-special-model',
        file: 'some-special-model.csv',
        status: MODEL_STATUS.PREPARING,
        createdAt: '2021-01-01 12:00:00',
    },
    {
        id: 222,
        name: "Some special model 2",
        slug: 'some-special-model-2',
        file: 'some-special-model-2.csv',
        status: MODEL_STATUS.COMPLETED,
        createdAt: '2021-01-01 12:00:00',
    },
];


const ModelList = () => {

    return (
        <>
            {isEmpty(rows) && <NoResults />}
            {!isEmpty(rows) && (
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
                            {rows.map((row) => <ModelTableRow key={row.name} data={row} />)}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </>
        
    )
}

export default ModelList;