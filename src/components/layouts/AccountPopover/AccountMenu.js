import * as React from 'react';
import {
  Avatar,
  Box,
  Typography,
  Link,
} from '@material-ui/core';
import { get } from 'lodash';
import { Link as RouterLink } from 'react-router-dom';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import useAuth from '../../../hooks/useAuth';


export default function AccountMenu({ onClick, component, customRef }) {
  const { user } = useAuth();

  return (
    <Box
      sx={{
        alignItems: 'center',
        backgroundColor: 'background.paper',
        borderRadius: 1,
        display: 'flex',
        overflow: 'hidden',
        p: 1,
        border: (theme) => `1px solid ${theme.palette.divider}`,
      }}
      onClick={onClick}
      component={component}
      ref={customRef}
    >
      <RouterLink to="/dashboard/account">
        <Avatar
          src={user.avatar}
          sx={{
            cursor: 'pointer',
            height: 48,
            width: 48
          }}
        />
      </RouterLink>
      <Box sx={{ ml: 2, textAlign: 'left' }}>
        <Typography
          color="textPrimary"
          variant="subtitle2"
        >
          {user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          Your plan:
          {' '}
          <Link
            color="primary"
            component={RouterLink}
            to="/pricing"
          >
            {get(user, 'account.subscription.plan.name', '-')}
          </Link>
        </Typography>
      </Box>
      <Box
        sx={{
          ml: 1,
        }}
      >
        <KeyboardArrowDownIcon />
      </Box>
    </Box>
  );
}