import { withStyles } from '@material-ui/core/styles';
import logo from '../images/logo.png';

const styles = () => ({
  root: {
    width: '52px',
    height: 'auto',
  }
});

const Logo = ({classes, ...props}) => (
  <img
    src={logo}
    alt="Captain Montitoring"
    className={classes.root}
    {...props}
  />
);

export default withStyles(styles)(Logo);
