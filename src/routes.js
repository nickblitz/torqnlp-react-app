import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import AuthGuard from './components/AuthGuard';
import DashboardLayout from './components/layouts/DashboardLayout';
import GuestGuard from './components/GuestGuard';
import LoadingScreen from './components/LoadingScreen';
import MainLayout from './components/MainLayout';
import { home } from './constants/routing';

const Loadable = (Component) => (props) => (
  <Suspense fallback={<LoadingScreen />}>
    <Component {...props} />
  </Suspense>
);

// Authentication pages

const Login = Loadable(lazy(() => import('./pages/authentication/Login')));
const Authorize = Loadable(lazy(() => import('./pages/authentication/Authorize')));
const PasswordRecovery = Loadable(lazy(() => import('./pages/authentication/PasswordRecovery')));
const PasswordReset = Loadable(lazy(() => import('./pages/authentication/PasswordReset')));
const Register = Loadable(lazy(() => import('./pages/authentication/Register')));
const VerifyCode = Loadable(lazy(() => import('./pages/authentication/VerifyCode')));

// Account pages
const Account = Loadable(lazy(() => import('./pages/Account')));

// Some app pages
const Home = Loadable(lazy(() => import('./pages/Home')));


// Error pages
const NotFound = Loadable(lazy(() => import('./pages/NotFound')));



const routes = [
  {
    path: 'authentication',
    children: [
      {
        path: 'login',
        element: (
          <GuestGuard>
            <Login />
          </GuestGuard>
        )
      },
      {
        path: 'password-recovery',
        element: <PasswordRecovery />
      },
      {
        path: 'password-reset',
        element: <PasswordReset />
      },
      {
        path: 'register',
        element: (
          <GuestGuard>
            <Register />
          </GuestGuard>
        )
      },
      {
        path: 'verify-code',
        element: <VerifyCode />
      }
    ]
  },
  {
    path: 'home',
    element: (
      <AuthGuard>
        <DashboardLayout/>
      </AuthGuard>
    ),
    children: [
      {
        path: '',
        element: (
          <Home />
        )
      },
    ]
  },
  // {
  //   path: 'crud-example',
  //   element: (
  //     <AuthGuard>
  //       <DashboardLayout />
  //     </AuthGuard>
  //   ),
  //   children: [
  //     {
  //       path: '/',
  //       element: (
  //         <CrudExample />
  //       )
  //     },
  //     {
  //       path: 'create',
  //       element: <CrudExampleCreate />
  //     },
  //   ]
  // },
  {
    path: 'account',
    element: (
      <AuthGuard>
        <DashboardLayout/>
      </AuthGuard>
    ),
    children: [
      {
        path: '',
        element: <Account/>
      },
    ]
  },
  {
    path: '*',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: (
          <AuthGuard>
            <Navigate to={home()} />
          </AuthGuard>
        )
      },
      {
        path: 'authorize',
        element: (
          <GuestGuard>
            <Authorize />
          </GuestGuard>
        )
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
];

export default routes;
