/**
 * Material-UI modal for displaying results
 */
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Alert,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const CompletionResultModal = ({ open, handleClose, result }) => (
    <>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle>Completion Result</DialogTitle>
            <DialogContent>
                <Alert sx={{mb: 4}} severity="info">The below json is a sample response this
                 is currently only using text-davinci-003, but will use the fine-tuned model created 
                 </Alert>
                {result}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    </>
);

CompletionResultModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    result: PropTypes.string.isRequired,
};

export default CompletionResultModal;
