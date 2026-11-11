
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

    // Loading state
    const [isLoading, setIsLoading] = useState(false);

    // Handle input changes
    function handleChange(e) {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        // Clear the current field error
        setErrors({
            ...errors,
            [name]: ''
        });

        setMessage('');
    }

    // Validate login form
    function validateForm() {

        const newErrors = {};

        const email = formData.email.trim();
        const password = formData.password;

        // Email validation
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Password validation
        if (!password.trim()) {
            newErrors.password = 'Password is required';
        } else if (password.length < 8) {
            newErrors.password = 'Password must contain at least 8 characters';
        }

        return newErrors;
    }

    // Handle login form submission
    function handleSubmit(e) {

        e.preventDefault();

        const newErrors = validateForm();

        setErrors(newErrors);
        setMessage('');

        // Stop if validation fails
        if (Object.keys(newErrors).length > 0) {
            return;
        }

        // Demo validation only
        // Actual login will be connected to backend later
        setIsLoading(true);

        setTimeout(() => {

            setIsLoading(false);

            setMessage(
                'Form validation successful! Backend login API is not connected yet.'
            );

        }, 500);
    }

    return (

        <div className="login-page">

            <div className="login-card">

                <h2>Welcome Back!</h2>

                <p>Login to your Cooking Recipe Portal</p>

                <form onSubmit={handleSubmit} noValidate>

                    {/* Email field */}
                    <label htmlFor="login-email">
                        Email Address
                    </label>

                    <input
                        id="login-email"
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={
                            errors.email ? 'login-email-error' : undefined
                        }
                    />

                    {errors.email && (
                        <span
                            id="login-email-error"
                            className="error"
                            role="alert"
                        >
                            {errors.email}
                        </span>
                    )}

                    {/* Password field */}
                    <label htmlFor="login-password">
                        Password
                    </label>

                    <input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="current-password"
                        aria-invalid={Boolean(errors.password)}
                        aria-describedby={
                            errors.password ? 'login-password-error' : undefined
                        }
                    />

                    {errors.password && (
                        <span
                            id="login-password-error"
                            className="error"
                            role="alert"
                        >
                            {errors.password}
                        </span>
                    )}

                    {/* Show password option */}
                    <div className="show-password">

                        <input
                            id="show-login-password"
                            type="checkbox"
                            checked={showPassword}
                            onChange={(e) =>
                                setShowPassword(e.target.checked)
                            }
                        />

                        <label htmlFor="show-login-password">
                            Show Password
                        </label>

                    </div>

                    {/* Login button */}
                    <button
                        type="submit"
                        className="login-submit-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Please wait...' : 'Login'}
                    </button>

                    {/* Success message */}
                    {message && (
                        <p className="login-message" role="status">
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
