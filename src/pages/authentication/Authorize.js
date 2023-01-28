import useAuth from '../../hooks/useAuth';
import { useEffect } from 'react';
import SplashScreen from '../../components/SplashScreen';


const Authorize = () => {
  const { authorize } = useAuth();

  useEffect(() => {
    authorize();
  }, [ authorize ]);

  return <SplashScreen />;
};

export default Authorize;
