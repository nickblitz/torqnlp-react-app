import { useContext } from 'react';
import AuthContext from '../contexts/Auth0Context';

const useAuth = () => useContext(AuthContext);

export default useAuth;
