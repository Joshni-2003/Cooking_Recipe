
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        alert('You have logged out successfully!');
        navigate('/');
    }

    return (
        <nav className="navbar">

            {/* Logo */}
            <Link to="/" className="logo">
                🍲 Recipe Portal
            </Link>

            {/* Navigation Links */}
            <div className="nav-links">

                <Link to="/">Home</Link>
                <Link to="/recipes">Explore Recipes</Link>

                {/* Guest Links */}
                {!user && (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                        <Link to="/demo-login">Demo Login</Link>
                    </>
                )}

                {/* User Links */}
                {user?.role === 'user' && (
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/profile">My Profile</Link>
                        <Link to="/my-recipes">My Recipes</Link>
                        <Link to="/my-drafts">My Drafts</Link>
                        <Link to="/my-reviews">My Reviews</Link>
                        <Link to="/favorites">Favorites</Link>
                        <Link to="/create-recipe">Create Recipe</Link>
                    </>
                )}

                {/* Moderator Links */}
                {user?.role === 'moderator' && (
                    <>
                        <Link to="/moderator-dashboard">
                            Moderator Dashboard
                        </Link>
                        <Link to="/moderator/review-reports">
                            Review Reports
                        </Link>
                    </>
                )}

                {/* Admin Links */}
                {user?.role === 'admin' && (
                    <>
                        <Link to="/admin-dashboard">
                            Admin Dashboard
                        </Link>

                        <Link to="/category-management">
                            Manage Categories
                        </Link>

                        <Link to="/featured-recipes">
                            Featured Recipes
                        </Link>

                        <Link to="/reports">Reports</Link>

                        <Link to="/moderator/review-reports">
                            Review Reports
                        </Link>

                        <Link to="/admin-settings">
                            Admin Settings
                        </Link>
                    </>
                )}

                {/* Logged-in User Details and Logout */}
                {user && (
                    <div className="nav-user">

                        <span>{user.email}</span>

                        <span className="user-role">
                            {user.role.toUpperCase()}
                        </span>

                        <button
                            type="button"
                            className="logout-btn"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>

                    </div>
                )}

            </div>
        </nav>
    );
}

export default Navbar;
