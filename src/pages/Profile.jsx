
import { useState } from 'react';

function Profile() {

    // Sample user profile
    const [profile, setProfile] = useState({
        name: 'Joshni',
        email: 'joshni@gmail.com',
        bio: 'I love cooking and trying new recipes.',
        location: 'India',
        image: ''
    });

    const [formData, setFormData] = useState(profile);
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

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

    // Save profile changes
    function handleSubmit(e) {

        e.preventDefault();

        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required.';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Enter a valid email address.';
        }

        if (
            formData.image.trim() &&
            !/^https?:\/\/\S+$/i.test(formData.image)
        ) {
            newErrors.image = 'Enter a valid image URL.';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {

            setProfile(formData);
            setIsEditing(false);
            setMessage('Profile updated successfully!');

        }
    }

    // Cancel editing
    function handleCancel() {

        setFormData(profile);
        setIsEditing(false);
        setErrors({});
        setMessage('');
    }

    return (

        <div className="profile-page">

            <div className="profile-card">

                <h1>My Profile 👤</h1>

                <p className="profile-subtitle">
                    View and manage your personal information.
                </p>

                {/* Profile Image */}
                <div className="profile-image-section">

                    {profile.image ? (

                        <img
                            src={profile.image}
                            alt="User profile"
                            className="profile-image"
                        />

                    ) : (

                        <div className="profile-placeholder">
                            {profile.name.charAt(0).toUpperCase() || 'U'}
                        </div>

                    )}

                    <h2>{profile.name}</h2>

                    <p>{profile.email}</p>

                </div>

                {message && (
                    <p className="profile-success">{message}</p>
                )}

                {!isEditing ? (

                    /* View Profile */
                    <div className="profile-details">

                        <div className="profile-detail-item">
                            <strong>Full Name:</strong>
                            <span>{profile.name}</span>
                        </div>

                        <div className="profile-detail-item">
                            <strong>Email:</strong>
                            <span>{profile.email}</span>
                        </div>

                        <div className="profile-detail-item">
                            <strong>Location:</strong>
                            <span>{profile.location || 'Not provided'}</span>
                        </div>

                        <div className="profile-detail-item">
                            <strong>About Me:</strong>
                            <span>{profile.bio || 'No bio added yet.'}</span>
                        </div>

                        <button
                            className="edit-profile-btn"
                            onClick={() => {
                                setFormData(profile);
                                setIsEditing(true);
                                setMessage('');
                            }}
                        >
                            ✏️ Edit Profile
                        </button>

                    </div>

                ) : (

                    /* Edit Profile Form */
                    <form
                        className="profile-form"
                        onSubmit={handleSubmit}
                    >

                        <label htmlFor="name">Full Name</label>

                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                        />

                        {errors.name && (
                            <span className="error">{errors.name}</span>
                        )}

                        <label htmlFor="email">Email Address</label>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />

                        {errors.email && (
                            <span className="error">{errors.email}</span>
                        )}

                        <label htmlFor="location">Location</label>

                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Enter your location"
                        />

                        <label htmlFor="bio">About Me</label>

                        <textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            placeholder="Tell us about yourself"
                            rows="4"
                        />

                        <label htmlFor="image">Profile Image URL</label>

                        <input
                            type="text"
                            id="image"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="Paste an image URL"
                        />

                        {errors.image && (
                            <span className="error">{errors.image}</span>
                        )}

                        <div className="profile-form-actions">

                            <button
                                type="submit"
                                className="save-profile-btn"
                            >
                                Save Changes
                            </button>

                            <button
                                type="button"
                                className="cancel-profile-btn"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                )}

            </div>

        </div>
    );
}

export default Profile;
