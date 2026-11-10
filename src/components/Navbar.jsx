
import { Link } from 'react-router-dom';

function Navbar() {

    return (
        <nav className="navbar">

            <h2 className="logo">
                🍲 Recipe Portal
            </h2>

            <div className="nav-links">

                <Link to="/">Home</Link>

                <Link to="/#recipes">Recipes</Link>

                <Link to="/#about">About</Link>

                <Link to="/login" className="login-btn">
                    Login
                </Link>

                <Link to="/register" className="register-nav-btn">
                    Register
                </Link>

            </div>

        </nav>
    );
}

export default Navbar;
