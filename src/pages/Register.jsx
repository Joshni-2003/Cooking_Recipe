
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Register() {

    // Store user's form details
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    // Store validation errors
    const [errors, setErrors] = useState({});

    // Store success message
    const [success, setSuccess] = useState('');

    // Show or hide passwords
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Loading state
    const [isLoading, setIsLoading] = useState(false);

    // Handle input changes
    function handleChange(e) {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        // Clear only the current field error
        setErrors({
            ...errors,
            [name]: ''
        });

        setSuccess('');
    }

    // Validate registration form
    function validateForm() {

        const newErrors = {};

        const name = formData.name.trim();
        const email = formData.email.trim();

        // Name validation
        if (!name) {
            newErrors.name = 'Full name is required';
        } else if (name.length < 2) {
            newErrors.name = 'Name must contain at least 2 characters';
        } else if (!/^[a-zA-Z ]+$/.test(name)) {
            newErrors.name = 'Name can contain only letters and spaces';
        }

        // Email validation
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ) {
            newErrors.email = 'Enter a valid email address';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must contain at least 8 characters';
        }

        // Confirm password validation
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (
            formData.password !== formData.confirmPassword
        ) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        return newErrors;
    }

    // Handle form submission
    function handleSubmit(e) {

        e.preventDefault();

        const newErrors = validateForm();

        setErrors(newErrors);
        setSuccess('');

        // Stop if validation fails
        if (Object.keys(newErrors).length > 0) {
            return;
        }

        // Frontend demo only
        // Backend registration API will be connected later
        setIsLoading(true);

        setTimeout(() => {

            setIsLoading(false);

            setSuccess(
                'Registration form validation successful! Backend API is not connected yet.'
            );

            // Clear form after successful validation
            setFormData({
                name: '',
                email: '',
                password: '',
                confirmPassword: ''
            });

        }, 500);
    }

    return (

        <div className="register-page">

            <div className="register-card">

                <h2>Create Your Account</h2>

                <p>Join our Cooking Recipe Portal</p>

                <form onSubmit={handleSubmit} noValidate>

                    {/* Full Name */}
                    <label htmlFor="register-name">
                        Full Name
                    </label>

                    <input
                        id="register-name"
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        autoComplete="name"
                        aria-invalid={Boolean(errors.name)}
                    />

                    {errors.name && (
                        <span className="error" role="alert">
                            {errors.name}
                        </span>
                    )}

                    {/* Email */}
                    <label htmlFor="register-email">
                        Email Address
                    </label>

                    <input
                        id="register-email"
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        aria-invalid={Boolean(errors.email)}
                    />

                    {errors.email && (
                        <span className="error" role="alert">
                            {errors.email}
                        </span>
                    )}

                    {/* Password */}
                    <label htmlFor="register-password">
                        Password
                    </label>

                    <input
                        id="register-password"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="new-password"
                        aria-invalid={Boolean(errors.password)}
                    />

                    {errors.password && (
                        <span className="error" role="alert">
                            {errors.password}
                        </span>
                    )}

                    <div className="show-password">

                        <input
                            id="show-register-password"
                            type="checkbox"
                            checked={showPassword}
                            onChange={(e) =>
                                setShowPassword(e.target.checked)
                            }
                        />

                        <label htmlFor="show-register-password">
                            Show Password
                        </label>

                    </div>

                    {/* Confirm Password */}
                    <label htmlFor="confirm-password">
                        Confirm Password
                    </label>

                    <input
                        id="confirm-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        autoComplete="new-password"
                        aria-invalid={Boolean(errors.confirmPassword)}
                    />

                    {errors.confirmPassword && (
                        <span className="error" role="alert">
                            {errors.confirmPassword}
                        </span>
                    )}

                    <div className="show-password">

                        <input
                            id="show-confirm-password"
                            type="checkbox"
                            checked={showConfirmPassword}
                            onChange={(e) =>
                                setShowConfirmPassword(e.target.checked)
                            }
                        />

                        <label htmlFor="show-confirm-password">
                            Show Confirm Password
                        </label>

                    </div>

                    {/* Register Button */}
                    <button
                        type="submit"
                        className="register-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Please wait...' : 'Register'}
                    </button>

                    {/* Success Message */}
                    {success && (
                        <p className="success" role="status">
                            {success}
                        </p>
                    )}

                </form>

                <p className="register-link">
                    Already have an account?
                    <Link to="/login"> Login here</Link>
                </p>

            </div>

        </div>
    );
}

export default Register;
