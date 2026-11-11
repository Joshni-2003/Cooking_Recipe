import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children, allowedRoles }) {

    const { user } = useAuth();

    // Check whether the user is logged in
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Check whether the user's role is allowed
    if (
        allowedRoles &&
        !allowedRoles.includes(user.role)
    ) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
}

export default ProtectedRoute;