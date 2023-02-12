import {
    Grid,
    Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const PageTitle = ({ title, subtitle, actionComponent }) => (
    <Grid
        container
        justifyContent="space-between"
        spacing={3}
        sx={{ mb: 3 }}
    >
        <Grid item>
            <Typography
                color="textPrimary"
                variant="h5"
            >
                {title}
            </Typography>
            {subtitle && (
                <Typography
                    color="textSecondary"
                    variant="subtitle2"
                >
                    {subtitle}
                </Typography>
            )}
        </Grid>
        {!!actionComponent && actionComponent()}
    </Grid>
);
PageTitle.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    actionComponent: PropTypes.func,
};

PageTitle.defaultProps = {
    subtitle: null,
    actionComponent: null,
};


export default PageTitle;