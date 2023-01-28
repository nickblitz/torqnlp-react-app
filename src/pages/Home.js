import { Helmet } from 'react-helmet-async';
import {
  Box,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import useSettings from '../hooks/useSettings';

const Home = () => {
    const { settings } = useSettings();
    return (
        <>
            <Helmet>
                <title>Search</title>
            </Helmet>
            <Box
                sx={{
                backgroundColor: 'background.default',
                minHeight: '100%',
                py: 8
                }}
            >
                <Container maxWidth={settings.compact ? 'xl' : false}>
                    <Grid
                        container
                        justifyContent="space-between"
                        spacing={3}
                    >
                        <Grid item>
                            <Typography
                                color="textPrimary"
                                variant="h5"
                            >
                                Home
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
}

export default Home;