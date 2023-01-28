import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, Divider, Drawer } from '@material-ui/core';
import {
  BuildCircle as BuildCircleIcon,
  // Sync as SyncIcon,
  Search as SearchIcon
} from '@material-ui/icons';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import UserIcon from '../../icons/User';
import NavSection from '../NavSection';
import Scrollbar from '../Scrollbar';
import { pipelines, account, search } from '../../constants/routing';
import logo from '../../images/logo.png';
import { experimentalStyled } from '@material-ui/core/styles';
import { appConfig } from '../../config';

const sections = [
  {
    title: 'General',
    items: [
      {
        title: 'Search',
        path: search(),
        icon: <SearchIcon fontSize="small" />
      },
      {
        title: 'Pipelines',
        path: pipelines(),
        icon: <BuildCircleIcon fontSize="small" />
      },
      // {
      //   title: 'Connected Apps',
      //   path: '/connected-apps',
      //   icon: <SyncIcon fontSize="small" />
      // },
      {
        title: 'Account',
        path: account(),
        icon: <UserIcon fontSize="small" />
      }
    ]
  }
];

const LogoImage = experimentalStyled('img')(({ theme }) => ({
  width: '100%',
}));

const DashboardSidebar = (props) => {
  const { onMobileClose, openMobile } = props;
  const location = useLocation();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Scrollbar options={{ suppressScrollX: true }}>
        <Box
          sx={{
            display: {
              xs: 'flex'
            },
            justifyContent: 'center',
            p: 2
          }}
        >
          <RouterLink to="/">
            <LogoImage src={logo} alt={appConfig.APP_NAME} />
          </RouterLink>
        </Box>
        <Divider />
        <Box sx={{ p: 2, flexGrow: 1 }}>
          {sections.map((section) => (
            <NavSection
              key={section.title}
              pathname={location.pathname}
              sx={{
                '& + &': {
                  mt: 3
                }
              }}
              {...section}
            />
          ))}
        </Box>
      </Scrollbar>
    </Box>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'background.paper',
            height: 'calc(100%) !important',
            width: 80
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onMobileClose}
      open={openMobile}
      PaperProps={{
        sx: {
          backgroundColor: 'background.paper',
          width: 80
        }
      }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

export default DashboardSidebar;
