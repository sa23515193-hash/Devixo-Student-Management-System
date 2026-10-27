import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from './Loader';
export default function ProtectedRoute({ children }) {
  const { user, ready } = useAuth();
  if (!ready) return <Loader/>;
  return user ? children : <Navigate to="/login" replace/>;
}
