import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
import { AppBar, Box, IconButton, Toolbar, Grid } from '@material-ui/core';
import { experimentalStyled } from '@material-ui/core/styles';
import MenuIcon from '../../icons/Menu';
import { fineTunedModels } from '../../constants/routing';
import AccountPopover from './AccountPopover';
import Logo from '../Logo';
import NavItemHorizontal from '../layouts/NavItemHorizontal';

const DashboardNavbarRoot = experimentalStyled(AppBar)(({ theme }) => ({
  ...(theme.palette.mode === 'light' && {
    boxShadow: 'none',
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
  }),
  ...(theme.palette.mode === 'dark' && {
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
    boxShadow: 'none'
  }),
  zIndex: theme.zIndex.drawer - 100,
  justifyContent: 'center',
  padding: '0 1.4rem',
  minHeight: '86px',
}));

const DashboardNavbar = (props) => {
  const { onSidebarMobileOpen, ...other } = props;

  return (
    <DashboardNavbarRoot
      {...other}
    >
      <Toolbar
        sx={{
          minHeight: '86px',
          backgroundColor: 'transparent',
        }}>
        <IconButton
          color="inherit"
          onClick={onSidebarMobileOpen}
          sx={{
            display: {
              lg: 'none'
            }
          }}
        >
          <MenuIcon fontSize="small" />
        </IconButton>
        <RouterLink to="/">
          <Logo
            sx={{
              display: {
                lg: 'inline',
                xs: 'none'
              },
              height: 40,
              width: 40
            }}
          />
        </RouterLink>
        <Box
          sx={{
            alignItems: 'center',
            ml: '1rem',
            display: {
              md: 'flex',
              xs: 'none'
            }
          }}
        >
          <NavItemHorizontal
            to={fineTunedModels()}
          >
            Fine-Tuned Models
          </NavItemHorizontal>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            ml: '80px',
          }}
        >
          <Grid container direction="column" alignItems="flex-end">
            <Grid item md={3}>
              <AccountPopover />
            </Grid>
          </Grid>
        </Box>
      </Toolbar>
    </DashboardNavbarRoot>
  );
};

DashboardNavbar.propTypes = {
  onSidebarMobileOpen: PropTypes.func
};

export default DashboardNavbar;
