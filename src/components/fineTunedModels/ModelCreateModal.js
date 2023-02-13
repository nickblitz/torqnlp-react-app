/**
 * Material-UI modal for createing a new OpenAI Fine-Tuning Model.
 */
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Alert,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import ModelCreateForm from './ModelCreateForm';

const ModelCreateModal = ({ open, handleClose }) => (
    <>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle>Create Monitor</DialogTitle>
            <DialogContent>
                <Alert sx={{mb: 4}} severity="info">
                    This will allow us to upload a file to create a new fine-tuned model. We will need to take 
                    formatted data set to upload for the model.
                 </Alert>
                <ModelCreateForm />
            </DialogContent>
        </Dialog>
    </>
);

ModelCreateModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default ModelCreateModal;
