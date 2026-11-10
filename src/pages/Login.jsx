import { Link } from 'react-router-dom';
import { useState } from 'react';

function Login() {

    // Store email and password
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    // Store validation errors
    const [errors, setErrors] = useState({});

    // Store login message
    const [message, setMessage] = useState('');

    // Show or hide password
    const [showPassword, setShowPassword] = useState(false);

    // Handle input changes
    function handleChange(e) {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        setErrors({});
        setMessage('');
    }

    // Handle login form submission
    function handleSubmit(e) {

        e.preventDefault();

        const newErrors = {};

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ) {
            newErrors.email = 'Please enter a valid email';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must contain at least 8 characters';
        }

        setErrors(newErrors);

        // Check whether validation passed
        if (Object.keys(newErrors).length === 0) {

            setMessage(
                'Form validation successful! Backend login API is not connected yet.'
            );
        }
    }

    return (

        <div className="login-page">

            <div className="login-card">

                <h2>Welcome Back!</h2>

                <p>Login to your Cooking Recipe Portal</p>

                <form onSubmit={handleSubmit}>

                    {/* Email field */}
                    <label>Email Address</label>

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    {errors.email && (
                        <span className="error">
                            {errors.email}
                        </span>
                    )}

                    {/* Password field */}
                    <label>Password</label>

                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    {errors.password && (
                        <span className="error">
                            {errors.password}
                        </span>
                    )}

                    {/* Show password option */}
                    <div className="show-password">

                        <input
                            type="checkbox"
                            checked={showPassword}
                            onChange={(e) =>
                                setShowPassword(e.target.checked)
                            }
                        />

                        <span>Show Password</span>

                    </div>

                    <button type="submit" className="login-submit-btn">
                        Login
                    </button>

                    {message && (
                        <p className="login-message">
                            {message}
                        </p>
                    )}

                </form>

                <p className="register-link">
                    Don't have an account?
                    <Link to="/register"> Register here</Link> 
                </p>

            </div>

        </div>
    );
}

export default Login;
