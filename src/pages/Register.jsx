import { Link } from 'react-router-dom';
import { useState } from 'react';

function Register() {

    // Store the user's form details
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    // Store error messages
    const [errors, setErrors] = useState({});

    // Store success message
    const [success, setSuccess] = useState('');

    // Handle input changes
    function handleChange(e) {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        setErrors({});
        setSuccess('');
    }

    // Validate and submit form
    function handleSubmit(e) {

        e.preventDefault();

        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ) {
            newErrors.email = 'Enter a valid email address';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must contain at least 8 characters';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (
            formData.password !== formData.confirmPassword
        ) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {

            setSuccess('Registration form submitted successfully!');

            setFormData({
                name: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
        }
    }

    return (
        <div className="register-page">

            <div className="register-card">

                <h2>Create Your Account</h2>

                <p>Join our Cooking Recipe Portal</p>

                <form onSubmit={handleSubmit}>

                    <label>Full Name</label>

                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                    />

                    {errors.name && (
                        <span className="error">{errors.name}</span>
                    )}

                    <label>Email Address</label>

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    {errors.email && (
                        <span className="error">{errors.email}</span>
                    )}

                    <label>Password</label>

                    <input
                        type="password"
                        name="password"
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    {errors.password && (
                        <span className="error">{errors.password}</span>
                    )}

                    <label>Confirm Password</label>

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />

                    {errors.confirmPassword && (
                        <span className="error">
                            {errors.confirmPassword}
                        </span>
                    )}

                    <button type="submit" className="register-btn">
                        Register
                    </button>

                    {success && (
                        <p className="success">{success}</p>
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
