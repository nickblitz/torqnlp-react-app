import { experimentalStyled } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { NavLink as RouterLink}  from 'react-router-dom';


const NavItemButton = experimentalStyled(Button)(({ theme }) => ({
  '&.active': {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.background.default,
  }
}));

const NavItemHorizontal = ({ children, ...props }) => (
  <NavItemButton
    color="primary"
    component={RouterLink}
    variant="body1"
    sx={theme => ({
      color: theme.palette.action.active,
    })}
    {...props}
  >
    {children}
  </NavItemButton>
);

export default NavItemHorizontal;