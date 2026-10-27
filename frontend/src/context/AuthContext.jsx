import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('devixo_token')) api('/auth/me').then(d => setUser(d.user)).catch(() => localStorage.removeItem('devixo_token')).finally(() => setReady(true));
    else setReady(true);
  }, []);
  const authenticate = (data) => { 
    localStorage.setItem('devixo_token', data.token); 
    setUser(data.user);
  };
  const logout = () => {
    localStorage.removeItem('devixo_token');
    setUser(null);
  };
  return <AuthContext.Provider value={
  { 
    user,
    ready,
    authenticate,
    logout
  }
  }>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
