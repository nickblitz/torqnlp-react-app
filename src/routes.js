import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import AuthGuard from './components/AuthGuard';
import DashboardLayout from './components/layouts/DashboardLayout';
import GuestGuard from './components/GuestGuard';
import LoadingScreen from './components/LoadingScreen';
import MainLayout from './components/layouts/MainLayout';
import { fineTunedModels } from './constants/routing';

const Loadable = (Component) => (props) => (
  <Suspense fallback={<LoadingScreen />}>
    <Component {...props} />
  </Suspense>
);

// Authentication pages

const Login = Loadable(lazy(() => import('./pages/authentication/Login')));
const Register = Loadable(lazy(() => import('./pages/authentication/Register')));

// Account pages
const Account = Loadable(lazy(() => import('./pages/Account')));

// Some app pages
const FineTunedModels = Loadable(lazy(() => import('./pages/FineTunedModels')));


// Error pages
const NotFound = Loadable(lazy(() => import('./pages/NotFound')));



const routes = [
  {
    path: 'fine-tuned-models',
    element: (
      <AuthGuard>
        <DashboardLayout/>
      </AuthGuard>
    ),
    children: [
      {
        path: '',
        element: (
          <FineTunedModels />
        )
      },
    ]
  },
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
            <Navigate to={fineTunedModels()} />
          </AuthGuard>
        )
      },
      {
        path: 'login',
        element: (
          <GuestGuard>
            <Login />
          </GuestGuard>
        )
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
        path: '*',
        element: <NotFound />
      }
    ]
  }
];

export default routes;
