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
    Paper,
    Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { get } from 'lodash';

const CompletionResultModal = ({ open, handleClose, result }) => (
    <>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            {console.log(result)}
            <DialogTitle>Completion Result</DialogTitle>
            <DialogContent>
                <Alert sx={{mb: 4}} severity="info">The below json is a sample response this
                 is currently only using text-davinci-003, but will use the fine-tuned model created 
                 </Alert>
                 <Paper sx={{ p: 2, overflow: 'hidden' }}>
                    <Typography variant="body" sx={{ mb: 4 }}>
                        {get(result, 'choices[0].text', '')}
                    </Typography>
                    <pre>
                        {JSON.stringify(result, null, 2)}
                    </pre>
                </Paper>
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
    result: PropTypes.shape({}).isRequired,
};

export default CompletionResultModal;
