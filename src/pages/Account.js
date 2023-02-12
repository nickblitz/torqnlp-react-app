import { Helmet } from 'react-helmet-async';
import {
  Box,
  Container,
  Divider,
  Grid,
  Typography
} from '@material-ui/core';
import {
  AccountGeneralSettings,
} from '../components/account';
import useSettings from '../hooks/useSettings';
import { appConfig } from '../config';

const Account = () => {
  const { settings } = useSettings();


  return (
    <>
      <Helmet>
        <title>Account | {appConfig.APP_NAME}</title>
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
                Account
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Box sx={{ mt: 3 }}>
            <AccountGeneralSettings />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Account;
