/**
 * Component to display when there are no results.
 */
import {
    Typography,
    Card,
    CardContent,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const NoResults = ({ message }) => (
    <Card>
        <CardContent>
            <Typography variant="body2" align="center">
                <b>{message}</b>
            </Typography>
        </CardContent>
    </Card>
);
NoResults.propTypes = {
    message: PropTypes.string,
};

NoResults.defaultProps = {
    message: 'No results found.',
};

export default NoResults;