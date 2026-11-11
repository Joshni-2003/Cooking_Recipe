
import { useState, useEffect, useRef } from 'react';

function ReviewSection({ recipeId }) {

    // Reference to the review form
    const reviewFormRef = useRef(null);

    // Get logged-in user information
    function getLoggedInUser() {

        try {
            const savedUser =
                localStorage.getItem('portalUser') ||
                localStorage.getItem('user');

            return savedUser ? JSON.parse(savedUser) : null;

        } catch (error) {
            console.error('Unable to load user:', error);
            return null;
        }
    }

    const loggedInUser = getLoggedInUser();

    const loggedInEmail = String(
        loggedInUser?.email || ''
    ).trim().toLowerCase();

    // Get current user's role
    const currentRole = String(
        loggedInUser?.role || ''
    ).toLowerCase();

    const canViewHiddenReviews =
        currentRole === 'moderator' ||
        currentRole === 'admin';

    // Review states
    const [reviews, setReviews] = useState([]);

    const [name, setName] = useState('');

    const [rating, setRating] = useState(0);

    const [comment, setComment] = useState('');

    // Edit review state
    const [editingReviewId, setEditingReviewId] = useState(null);

    // Sorting and filtering
    const [sortOption, setSortOption] = useState('latest');

    const [filterRating, setFilterRating] = useState('all');

    // Reporting states
    const [reportingReviewId, setReportingReviewId] = useState(null);

    const [reportReason, setReportReason] = useState('Spam');

    const [reportDetails, setReportDetails] = useState('');

    const [reports, setReports] = useState([]);

    // Storage keys
    const storageKey = `recipe-reviews-${recipeId}`;

    const reportsStorageKey = 'recipe-review-reports';

    // Loading states
    const [reviewsLoadedFor, setReviewsLoadedFor] = useState(null);

    const [reportsLoaded, setReportsLoaded] = useState(false);

    // 1. Load logged-in user's name
    useEffect(() => {

        setName(
            loggedInUser?.name ||
            loggedInUser?.username ||
            ''
        );

    }, [
        loggedInUser?.name,
        loggedInUser?.username,
        loggedInEmail
    ]);

    // 2. Load existing reviews
    useEffect(() => {

        setReviewsLoadedFor(null);

        const savedReviews = localStorage.getItem(storageKey);

        if (savedReviews) {

            try {
                const parsedReviews = JSON.parse(savedReviews);

                setReviews(
                    Array.isArray(parsedReviews)
                        ? parsedReviews
                        : []
                );

            } catch (error) {

                console.error('Unable to load reviews:', error);

                setReviews([]);
            }

        } else {

            setReviews([]);
        }

        setReviewsLoadedFor(storageKey);

    }, [storageKey]);

    // 3. Save reviews automatically
    useEffect(() => {

        if (reviewsLoadedFor !== storageKey) {
            return;
        }

        localStorage.setItem(
            storageKey,
            JSON.stringify(reviews)
        );

    }, [reviews, storageKey, reviewsLoadedFor]);

    // 4. Load reported reviews
    useEffect(() => {

        const savedReports = localStorage.getItem(reportsStorageKey);

        if (savedReports) {

            try {
                const parsedReports = JSON.parse(savedReports);

                setReports(
                    Array.isArray(parsedReports)
                        ? parsedReports
                        : []
                );

            } catch (error) {

                console.error('Unable to load reports:', error);

                setReports([]);
            }

        } else {

            setReports([]);
        }

        setReportsLoaded(true);

    }, []);

    // 5. Save reports automatically
    useEffect(() => {

        if (!reportsLoaded) {
            return;
        }

        localStorage.setItem(
            reportsStorageKey,
            JSON.stringify(reports)
        );

    }, [reports, reportsLoaded]);

    // 6. Create reviewer identity
    function getReviewerId(reviewerName) {

        if (loggedInEmail) {
            return `email:${loggedInEmail}`;
        }

        return `name:${reviewerName.trim().toLowerCase()}`;
    }

    // 7. Find current user's existing review
    const existingReview = reviews.find((review) => {

        if (loggedInEmail && review.reviewerId) {

            return review.reviewerId === `email:${loggedInEmail}`;
        }

        return (
            review.name?.trim().toLowerCase() ===
            name.trim().toLowerCase()
        );
    });

    // 8. Filter reviews
    const filteredReviews = reviews.filter((review) => {

        if (review.isHidden && !canViewHiddenReviews) {
            return false;
        }

        if (filterRating === 'all') {
            return true;
        }

        return Number(review.rating) === Number(filterRating);
    });

    // 9. Sort reviews
    const visibleReviews = [...filteredReviews].sort((a, b) => {

        if (sortOption === 'latest') {
            return b.id - a.id;
        }

        if (sortOption === 'oldest') {
            return a.id - b.id;
        }

        if (sortOption === 'highest') {
            return Number(b.rating) - Number(a.rating);
        }

        if (sortOption === 'lowest') {
            return Number(a.rating) - Number(b.rating);
        }

        return 0;
    });

    // 10. Calculate average rating safely
    const totalRating = visibleReviews.reduce(
        (total, review) => {

            const safeRating = Math.min(
                5,
                Math.max(0, Number(review.rating) || 0)
            );

            return total + safeRating;
        },
        0
    );

    const averageRating = visibleReviews.length > 0
        ? (totalRating / visibleReviews.length).toFixed(1)
        : '0.0';

    // 11. Submit or update review
    function handleSubmitReview(event) {

        event.preventDefault();

        if (!name.trim()) {
            alert('Please enter your name.');
            return;
        }

        if (rating === 0) {
            alert('Please select a rating.');
            return;
        }

        if (!comment.trim()) {
            alert('Please write your review.');
            return;
        }

        const reviewerId = getReviewerId(name);

        if (editingReviewId !== null) {

            const updatedReviews = reviews.map((review) => {

                if (review.id === editingReviewId) {

                    return {
                        ...review,
                        name: name.trim(),
                        rating,
                        comment: comment.trim(),
                        reviewerId,
                        date: new Date().toLocaleDateString()
                    };
                }

                return review;
            });

            setReviews(updatedReviews);

            setEditingReviewId(null);

            alert('Review updated successfully!');

        } else {

            // Prevent duplicate reviews
            const alreadyReviewed = reviews.some((review) => {

                if (loggedInEmail && review.reviewerId) {
                    return review.reviewerId === reviewerId;
                }

                return (
                    review.name?.trim().toLowerCase() ===
                    name.trim().toLowerCase()
                );
            });

            if (alreadyReviewed) {

                alert(
                    'You have already reviewed this recipe. Please edit your existing review.'
                );

                return;
            }

            const newReview = {
                id: Date.now(),
                reviewerId,
                name: name.trim(),
                rating,
                comment: comment.trim(),
                date: new Date().toLocaleDateString()
            };

            setReviews((previous) => [
                ...previous,
                newReview
            ]);

            alert('Review submitted successfully!');
        }

        setRating(0);

        setComment('');
    }

    // 12. Edit review
    function handleEditReview(review) {

        setEditingReviewId(review.id);

        setName(review.name);

        setRating(
            Math.min(
                5,
                Math.max(0, Number(review.rating) || 0)
            )
        );

        setComment(review.comment);

        // Scroll to the review form instead of page top
        setTimeout(() => {

            reviewFormRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });

        }, 100);
    }

    // 13. Cancel editing
    function cancelEdit() {

        setEditingReviewId(null);

        setName(
            loggedInUser?.name ||
            loggedInUser?.username ||
            ''
        );

        setRating(0);

        setComment('');
    }

    // 14. Delete review
    function handleDeleteReview(reviewId) {

        const confirmDelete = window.confirm(
            'Are you sure you want to delete this review?'
        );

        if (!confirmDelete) return;

        setReviews((previous) =>
            previous.filter((review) => review.id !== reviewId)
        );

        if (editingReviewId === reviewId) {
            cancelEdit();
        }

        alert('Review deleted successfully!');
    }

    // 15. Submit a report
    function handleReportReview(review) {

        if (!loggedInEmail && !name.trim()) {

            alert('Please enter your name before reporting a review.');

            return;
        }

        const reporterId = loggedInEmail
            ? `email:${loggedInEmail}`
            : `name:${name.trim().toLowerCase()}`;

        const alreadyReported = reports.some((report) => {

            return (
                String(report.reviewId) === String(review.id) &&
                String(report.recipeId) === String(recipeId) &&
                report.reporterId === reporterId &&
                report.status === 'Pending'
            );
        });

        if (alreadyReported) {

            alert('You have already reported this review.');

            return;
        }

        const newReport = {

            id: Date.now(),

            reviewId: review.id,

            recipeId,

            reviewName: review.name,

            reviewComment: review.comment,

            reviewRating: review.rating,

            reporterId,

            reportedBy:
                loggedInUser?.name ||
                loggedInUser?.username ||
                name.trim(),

            reason: reportReason,

            details: reportDetails.trim(),

            date: new Date().toLocaleString(),

            status: 'Pending'
        };

        setReports((previous) => [
            ...previous,
            newReport
        ]);

        setReportingReviewId(null);

        setReportReason('Spam');

        setReportDetails('');

        alert(
            'Review reported successfully. A moderator will check it.'
        );
    }

    // 16. Cancel reporting
    function cancelReport() {

        setReportingReviewId(null);

        setReportReason('Spam');

        setReportDetails('');
    }

    return (

        <section className="review-section">

            <h2>⭐ Ratings and Reviews</h2>

            {/* Rating Summary */}
            <div className="rating-summary">

                <h3>{averageRating} / 5 ⭐</h3>

                <p>
                    Based on {visibleReviews.length} reviews
                </p>

            </div>

            {/* Review Form */}
            <div
                className="review-form"
                ref={reviewFormRef}
            >

                <h3>
                    {editingReviewId !== null
                        ? '✏️ Edit Your Review'
                        : 'Write a Review'}
                </h3>

                {existingReview && editingReviewId === null && (

                    <p className="existing-review-message">
                        You have already reviewed this recipe.
                        You can edit or delete your existing review below.
                    </p>

                )}

                <form onSubmit={handleSubmitReview}>

                    {/* Reviewer Name */}
                    <label htmlFor="reviewer-name">
                        Your Name
                    </label>

                    <input
                        id="reviewer-name"
                        type="text"
                        value={name}
                        onChange={(event) =>
                            setName(event.target.value)
                        }
                        placeholder="Enter your name"
                        required
                        disabled={Boolean(
                            loggedInEmail &&
                            (loggedInUser?.name || loggedInUser?.username) &&
                            editingReviewId === null
                        )}
                    />

                    {/* Rating */}
                    <label>Your Rating</label>

                    <div className="rating-stars">

                        {[1, 2, 3, 4, 5].map((star) => (

                            <button
                                key={star}
                                type="button"
                                className={
                                    star <= rating
                                        ? 'star active'
                                        : 'star'
                                }
                                onClick={() => setRating(star)}
                                aria-label={`Rate ${star} out of 5`}
                                aria-pressed={star <= rating}
                            >
                                ★
                            </button>

                        ))}

                    </div>

                    {/* Review Comment */}
                    <label htmlFor="review-comment">
                        Your Review
                    </label>

                    <textarea
                        id="review-comment"
                        value={comment}
                        onChange={(event) =>
                            setComment(event.target.value)
                        }
                        placeholder="Write your experience..."
                        rows="4"
                        required
                    />

                    {/* Submit and Cancel */}
                    <div className="review-form-buttons">

                        <button type="submit">
                            {editingReviewId !== null
                                ? 'Update Review'
                                : 'Submit Review'}
                        </button>

                        {editingReviewId !== null && (

                            <button
                                type="button"
                                className="cancel-edit-btn"
                                onClick={cancelEdit}
                            >
                                Cancel
                            </button>

                        )}

                    </div>

                </form>

            </div>

            {/* Customer Reviews */}
            <div className="reviews-list">

                <h3>Customer Reviews</h3>

                {/* Sorting and Filtering */}
                <div className="review-controls">

                    <div>

                        <label htmlFor="filter-rating">
                            Filter by Rating:
                        </label>

                        <select
                            id="filter-rating"
                            value={filterRating}
                            onChange={(event) =>
                                setFilterRating(event.target.value)
                            }
                        >
                            <option value="all">All Ratings</option>
                            <option value="5">5 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="2">2 Stars</option>
                            <option value="1">1 Star</option>
                        </select>

                    </div>

                    <div>

                        <label htmlFor="sort-reviews">
                            Sort Reviews:
                        </label>

                        <select
                            id="sort-reviews"
                            value={sortOption}
                            onChange={(event) =>
                                setSortOption(event.target.value)
                            }
                        >
                            <option value="latest">Latest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="highest">Highest Rating</option>
                            <option value="lowest">Lowest Rating</option>
                        </select>

                    </div>

                </div>

                {/* Review Count */}
                <p className="review-count">
                    Showing {visibleReviews.length} of {
                        canViewHiddenReviews
                            ? reviews.length
                            : reviews.filter((review) => !review.isHidden).length
                    } reviews
                </p>

                {/* Display Reviews */}
                {visibleReviews.length === 0 ? (

                    <p className="no-reviews-message">
                        {reviews.length === 0
                            ? 'No reviews yet. Be the first to review!'
                            : 'No visible reviews found for this rating.'}
                    </p>

                ) : (

                    visibleReviews.map((review) => {

                        const isMyReview = loggedInEmail
                            ? review.reviewerId === `email:${loggedInEmail}`
                            : review.name?.trim().toLowerCase() ===
                              name.trim().toLowerCase();

                        // Validate rating between 0 and 5
                        const safeRating = Math.round(
                            Math.min(
                                5,
                                Math.max(0, Number(review.rating) || 0)
                            )
                        );

                        return (

                            <div
                                className="review-card"
                                key={review.id}
                            >

                                <div className="review-card-header">

                                    <h4>{review.name}</h4>

                                    <span>{review.date}</span>

                                </div>

                                {/* Hidden Review Label */}
                                {review.isHidden && canViewHiddenReviews && (

                                    <p className="hidden-review-label">
                                        🚫 This review is hidden from normal users.
                                    </p>

                                )}

                                {/* Review Stars */}
                                <div className="review-card-stars">

                                    {'★'.repeat(safeRating)}
                                    {'☆'.repeat(5 - safeRating)}

                                </div>

                                <p>{review.comment}</p>

                                {/* Edit and Delete Buttons */}
                                {isMyReview && !review.isHidden && (

                                    <div className="review-actions">

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleEditReview(review)
                                            }
                                        >
                                            ✏️ Edit
                                        </button>

                                        <button
                                            type="button"
                                            className="delete-review-btn"
                                            onClick={() =>
                                                handleDeleteReview(review.id)
                                            }
                                        >
                                            🗑️ Delete
                                        </button>

                                    </div>

                                )}

                                {/* Report Review */}
                                {!isMyReview && !review.isHidden && (

                                    <div className="report-review-section">

                                        {reportingReviewId === review.id ? (

                                            <div className="report-form">

                                                <h4>🚩 Report this review</h4>

                                                <label>
                                                    Reason for reporting:
                                                </label>

                                                <select
                                                    value={reportReason}
                                                    onChange={(event) =>
                                                        setReportReason(event.target.value)
                                                    }
                                                >
                                                    <option value="Spam">
                                                        Spam
                                                    </option>

                                                    <option value="Offensive Content">
                                                        Offensive Content
                                                    </option>

                                                    <option value="Fake Review">
                                                        Fake Review
                                                    </option>

                                                    <option value="Inappropriate Language">
                                                        Inappropriate Language
                                                    </option>

                                                    <option value="Other">
                                                        Other
                                                    </option>
                                                </select>

                                                <label>
                                                    Additional details:
                                                </label>

                                                <textarea
                                                    value={reportDetails}
                                                    onChange={(event) =>
                                                        setReportDetails(event.target.value)
                                                    }
                                                    placeholder="Explain why you are reporting this review..."
                                                    rows="3"
                                                />

                                                <div className="report-form-buttons">

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleReportReview(review)
                                                        }
                                                    >
                                                        Submit Report
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="cancel-report-btn"
                                                        onClick={cancelReport}
                                                    >
                                                        Cancel
                                                    </button>

                                                </div>

                                            </div>

                                        ) : (

                                            <button
                                                type="button"
                                                className="report-review-btn"
                                                onClick={() =>
                                                    setReportingReviewId(review.id)
                                                }
                                            >
                                                🚩 Report Review
                                            </button>

                                        )}

                                    </div>

                                )}

                            </div>

                        );

                    })

                )}

            </div>

        </section>
    );
}

export default ReviewSection;
