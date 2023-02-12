import {
    Box,
    Container,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import useSettings from '../../hooks/useSettings';

const PageContainer = ({ children }) => {
    const { settings } = useSettings();
    return  (
        <Box
            sx={{
            backgroundColor: 'background.default',
            minHeight: '100%',
            py: 8
            }}
        >
            <Container maxWidth={settings.compact ? 'xl' : false}>{children}</Container>
        </Box>
    );
}

PageContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PageContainer;