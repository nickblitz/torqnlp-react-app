import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
import { AppBar, Box, IconButton, Toolbar, Grid } from '@material-ui/core';
import { experimentalStyled } from '@material-ui/core/styles';
import MenuIcon from '../../icons/Menu';
import { account, home } from '../../constants/routing';
import AccountPopover from './AccountPopover';
import Logo from '../Logo';
import NavItemHorizontal from '../NavItemHorizontal';

const DashboardNavbarRoot = experimentalStyled(AppBar)(({ theme }) => ({
  ...(theme.palette.mode === 'light' && {
    boxShadow: 'none',
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
    minHeight: '86px',
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: '0 1.4rem',
  }),
  ...(theme.palette.mode === 'dark' && {
    borderBottom: `1px solid ${theme.palette.divider}`,
    boxShadow: 'none'
  }),
  zIndex: theme.zIndex.drawer - 100,
  justifyContent: 'center',
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
            to={home()}
          >
            Home
          </NavItemHorizontal>
          <NavItemHorizontal
            to={account()}
          >
            Account
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
