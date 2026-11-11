
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function DemoLogin() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('user');

    const { login } = useAuth();
    const navigate = useNavigate();

    function handleLogin(e) {

        e.preventDefault();

        if (!name.trim()) {
            alert('Please enter your name');
            return;
        }

        if (!email.trim()) {
            alert('Please enter your email');
            return;
        }

        // Save name, email and role in AuthContext
        login(email, role, name);

        // Navigate according to role
        if (role === 'admin') {
            navigate('/reports');
        }
        else if (role === 'moderator') {
            navigate('/moderator-dashboard');
        }
        else {
            navigate('/profile');
        }
    }

    return (
        <div className="demo-login">

            <h2>Demo Login</h2>

            <form onSubmit={handleLogin}>

                {/* Name field */}
                <label htmlFor="demo-name">
                    Name
                </label>

                <input
                    id="demo-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                />

                {/* Email field */}
                <label htmlFor="demo-email">
                    Email
                </label>

                <input
                    id="demo-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                />

                {/* Role selection */}
                <label htmlFor="demo-role">
                    Select Role
                </label>

                <select
                    id="demo-role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="user">User</option>
                    <option value="moderator">Moderator</option>
                    <option value="admin">Admin</option>
                </select>

                <button type="submit">
                    Login
                </button>

            </form>

        </div>
    );
}

export default DemoLogin;
