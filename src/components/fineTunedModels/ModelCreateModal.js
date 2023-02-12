/**
 * Material-UI modal for createing a new OpenAI Fine-Tuning Model.
 */
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const MonitorCreateModal = ({ open, handleClose }) => (
    <>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle>Create Monitor</DialogTitle>
            <DialogContent>
                my form
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleClose} color="primary">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    </>
);

MonitorCreateModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default MonitorCreateModal;
