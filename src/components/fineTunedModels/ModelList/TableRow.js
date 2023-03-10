/**
 * Table row component containing following columns: Model Name, Slug, File used for training,
 * Status, Created at, Actions
 */
import {
    TableCell,
    TableRow,
    Chip,
    IconButton,
    Tooltip,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { Delete as DeleteIcon, Download as DownloadIcon } from '@material-ui/icons';
import moment from 'moment';
import { MODEL_STATUS_LABELS, MODEL_STATUS } from '../../../constants/fineTunedModels';
import useAuth from '../../../hooks/useAuth';
import downloadFile from '../../../utils/downloadFile';


const ModelTableRow = ({ data }) => {
    const { user } = useAuth();
    return (
        <TableRow key={data.id}>
            <TableCell component="th" scope="row">
                {data.name}
            </TableCell>
            <TableCell align="left">{data.slug}</TableCell>
            <TableCell align="left">{data.file}</TableCell>
            <TableCell align="left">
                <Chip label={MODEL_STATUS_LABELS[data.status]} />
            </TableCell>
            <TableCell align="left">{moment(data.createdAt).format('MMM Do, YYYY')}</TableCell>
            <TableCell align="right">
                <Tooltip title="Download Embeddings">
                    <IconButton 
                        aria-label="Download Embeddings" 
                        disabled={data.status !== MODEL_STATUS.COMPLETED} 
                        color="primary"
                        onClick={() => {
                            alert("This will redirect to a sample embeddings file download");
                            downloadFile(data.dataSetFileUrl);
                        }}
                    >
                        <DownloadIcon />
                    </IconButton>
                </Tooltip>
                {user.id === data.createdByUserId && (
                    <Tooltip title="Delete">
                        <IconButton aria-label="delete" color="primary">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                )}
                
            </TableCell>
        </TableRow>
    );
}

ModelTableRow.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        file: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
    }).isRequired,
};

export default ModelTableRow;