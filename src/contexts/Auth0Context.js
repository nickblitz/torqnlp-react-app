import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { Auth0Client } from '@auth0/auth0-spa-js';
import { AUTHENTICATION_COOKIE_NAME } from '../constants/cookies';
import { auth0Config } from '../config';
import { userApi } from '../api/user';
import { createAuthHeader } from '../utils/authHeaders';

let auth0Client = null;

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  accessToken: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null
  }),
};


const transformUser = (auth0User, userApiData) => ({
  avatar: auth0User.picture,
  email: auth0User.email,
  plan: 'Premium',
  ...userApiData,
});

const reducer = (state, action) => (handlers[action.type]
  ? handlers[action.type](state, action)
  : state);

const AuthContext = createContext({
  ...initialState,
  platform: 'Auth0',
  loginWithPopup: () => Promise.resolve(),
  loginWithRedirect: () => Promise.resolve(),
  authorize: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        auth0Client = new Auth0Client({
          redirect_uri: window.location.origin + '/authorize',
          ...auth0Config
        });

        await auth0Client.checkSession();

        const isAuthenticated = await auth0Client.isAuthenticated();

        if (isAuthenticated) {
          const user = await auth0Client.getUser();
          const accessToken = await auth0Client.getTokenSilently();
          Cookies.set(AUTHENTICATION_COOKIE_NAME, accessToken);
          // Here you should extract the complete user profile to make it
          // available in your entire app.
          // The auth state only provides basic information.
          const userData = await userApi.me({ headers: createAuthHeader(accessToken) });
          dispatch({
            type: 'INITIALIZE',
            payload: {
              accessToken,
              isAuthenticated,
              user: transformUser(user, userData),
            }
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated,
              user: null
            }
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    };

    initialize();
  }, []);

  const handleLogin = async () => {
    const isAuthenticated = await auth0Client.isAuthenticated();

    if (isAuthenticated) {
      const user = await auth0Client.getUser();
      const accessToken = await auth0Client.getTokenSilently();
      Cookies.set(AUTHENTICATION_COOKIE_NAME, accessToken);
      const userData = await userApi.me({ headers: createAuthHeader(accessToken) });

      // Here you should extract the complete user profile to make it available in your entire app.
      // The auth state only provides basic information.

      dispatch({
        type: 'LOGIN',
        payload: {
          accessToken,
          isAuthenticated,
          user: transformUser(user, userData),
        }
      });
    }
  }

  const authorize = async () => {
    await auth0Client.handleRedirectCallback();
    await handleLogin();
  }

  const loginWithRedirect = async (options) => {
    await auth0Client.loginWithRedirect({
      authorizationParams: {
        redirect_uri: window.location,
      },
    });
  };

  const loginWithPopup = async (options) => {
    await auth0Client.loginWithPopup(options);
    await handleLogin();
  };

  const logout = async () => {
    await auth0Client.logout();
    Cookies.remove(AUTHENTICATION_COOKIE_NAME);
    dispatch({
      type: 'LOGOUT'
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        platform: 'Auth0',
        loginWithPopup,
        loginWithRedirect,
        authorize,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AuthContext;
