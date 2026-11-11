
import { useState } from 'react';

function MyReviews() {

    const [reviews, setReviews] = useState([
        {
            id: 1,
            recipeName: 'Vegetable Biryani',
            rating: 5,
            comment: 'Very tasty and easy to prepare!'
        },
        {
            id: 2,
            recipeName: 'Chocolate Cake',
            rating: 4,
            comment: 'The cake was delicious. I really enjoyed it.'
        },
        {
            id: 3,
            recipeName: 'Masala Dosa',
            rating: 3,
            comment: 'Good recipe, but the instructions could be clearer.'
        }
    ]);

    const [filter, setFilter] = useState('All');
    const [editingReview, setEditingReview] = useState(null);
    const [message, setMessage] = useState('');

    // Filter reviews by rating
    const filteredReviews = reviews.filter((review) => {
        if (filter === 'All') {
            return true;
        }

        return review.rating === Number(filter);
    });

    // Open a review for editing
    function editReview(review) {
        setEditingReview({ ...review });
        setMessage('');
    }

    // Update review form fields
    function handleChange(e) {
        const { name, value } = e.target;

        setEditingReview({
            ...editingReview,
            [name]: name === 'rating' ? Number(value) : value
        });
    }

    // Save updated review
    function saveReview(e) {
        e.preventDefault();

        if (!editingReview.comment.trim()) {
            setMessage('Please enter your review.');
            return;
        }

        setReviews((previousReviews) =>
            previousReviews.map((review) =>
                review.id === editingReview.id
                    ? editingReview
                    : review
            )
        );

        setEditingReview(null);
        setMessage('Review updated successfully!');
    }

    // Delete a review
    function deleteReview(id) {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this review?'
        );

        if (confirmDelete) {
            setReviews((previousReviews) =>
                previousReviews.filter((review) => review.id !== id)
            );

            setMessage('Review deleted successfully!');
        }
    }

    return (
        <div className="my-reviews-page">

            <div className="my-reviews-header">
                <h1>My Reviews ⭐</h1>
                <p>View and manage the reviews you have written.</p>
            </div>

            {message && (
                <p className="my-reviews-message">
                    {message}
                </p>
            )}

            {/* Filter reviews */}
            <div className="reviews-filter">

                <label htmlFor="ratingFilter">
                    Filter by Rating:
                </label>

                <select
                    id="ratingFilter"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="All">All Ratings</option>
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                </select>

            </div>

            {/* Edit review form */}
            {editingReview && (

                <form
                    className="edit-review-form"
                    onSubmit={saveReview}
                >

                    <h2>Edit Your Review</h2>

                    <label>Recipe Name</label>

                    <input
                        type="text"
                        value={editingReview.recipeName}
                        disabled
                    />

                    <label>Rating</label>

                    <select
                        name="rating"
                        value={editingReview.rating}
                        onChange={handleChange}
                    >
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="2">2 Stars</option>
                        <option value="1">1 Star</option>
                    </select>

                    <label>Your Review</label>

                    <textarea
                        name="comment"
                        value={editingReview.comment}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Write your review"
                    />

                    <div className="review-form-actions">

                        <button type="submit">
                            Save Changes
                        </button>

                        <button
                            type="button"
                            onClick={() => setEditingReview(null)}
                        >
                            Cancel
                        </button>

                    </div>

                </form>
            )}

            {/* Review list */}
            <div className="my-reviews-list">

                {filteredReviews.length === 0 ? (

                    <div className="no-reviews">
                        <h2>No Reviews Found</h2>
                        <p>You have not written reviews for this rating.</p>
                    </div>

                ) : (

                    filteredReviews.map((review) => (

                        <div className="my-review-card" key={review.id}>

                            <h2>{review.recipeName}</h2>

                            <p className="review-stars">
                                {'★'.repeat(review.rating)}
                                {'☆'.repeat(5 - review.rating)}
                            </p>

                            <p className="review-comment">
                                {review.comment}
                            </p>

                            <div className="my-review-actions">

                                <button
                                    className="edit-review-btn"
                                    onClick={() => editReview(review)}
                                >
                                    Edit Review
                                </button>

                                <button
                                    className="delete-review-btn"
                                    onClick={() => deleteReview(review.id)}
                                >
                                    Delete Review
                                </button>

                            </div>

                        </div>

                    ))

                )}

            </div>

        </div>
    );
}

export default MyReviews;
