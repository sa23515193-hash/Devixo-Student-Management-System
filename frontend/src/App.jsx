import { Navigate, Route, Routes } from 'react-router-dom';

// Context
import { useAuth } from './context/AuthContext';

// Components
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Loader from './components/Loader';

// Pages
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import StudentProfile from './pages/StudentProfile';

export default function App() {
const { user, ready } = useAuth();

```
// Show loader while authentication is being initialized
if (!ready) {
    return <Loader />;
}

return (
    <Routes>

        {/* Login Page */}
        <Route
            path="/login"
            element={
                user
                    ? <Navigate to="/" replace />
                    : <AuthPage mode="login" />
            }
        />

        {/* Registration Page */}
        <Route
            path="/register"
            element={
                user
                    ? <Navigate to="/" replace />
                    : <AuthPage mode="register" />
            }
        />

        {/* Protected Dashboard Layout */}
        <Route
            path="/"
            element={
                <ProtectedRoute>
                    <Layout />
                </ProtectedRoute>
            }
        >
            {/* Dashboard Home */}
            <Route
                index
                element={<Dashboard />}
            />

            {/* Students List */}
            <Route
                path="students"
                element={<Students />}
            />

            {/* Individual Student Profile */}
            <Route
                path="students/:id"
                element={<StudentProfile />}
            />
        </Route>

        {/* Redirect Unknown Routes */}
        <Route
            path="*"
            element={
                <Navigate
                    to={user ? '/' : '/login'}
                    replace
                />
            }
        />

    </Routes>
);
```

}
