import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import StudentProfile from './pages/StudentProfile';
import Loader from './components/Loader';
export default function App(){const {user,ready}=useAuth();if(!ready)return <Loader/>;return <Routes><Route path="/login" element={user?<Navigate to="/" replace/>:<AuthPage mode="login"/>}/><Route path="/register" element={user?<Navigate to="/" replace/>:<AuthPage mode="register"/>}/><Route path="/" element={<ProtectedRoute><Layout/></ProtectedRoute>}><Route index element={<Dashboard/>}/><Route path="students" element={<Students/>}/><Route path="students/:id" element={<StudentProfile/>}/></Route><Route path="*" element={<Navigate to={user?'/':'/login'} replace/>}/></Routes>;}
