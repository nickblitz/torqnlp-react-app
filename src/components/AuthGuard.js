import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { get, isEmpty } from 'lodash';
import useAuth from '../hooks/useAuth';
import NoAccount from '../pages/NoAccount';

const AuthGuard = (props) => {
  const { children } = props;
  const { loginWithRedirect, isAuthenticated, user } = useAuth();
  const location = useLocation();
  const [requestedLocation, setRequestedLocation] = useState(null);

  if (!isAuthenticated) {

    if (location.pathname !== requestedLocation) {
      setRequestedLocation(location.pathname);
    }
    loginWithRedirect();
    return null;
  }

  if (isEmpty(get(user, 'account'))) {
    return <NoAccount />
  }

  // This is done so that in case the route changes by any chance through other
  // means between the moment of request and the render we navigate to the initially
  // requested route.
  if (requestedLocation && location.pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
};

AuthGuard.propTypes = {
  children: PropTypes.node
};

export default AuthGuard;
