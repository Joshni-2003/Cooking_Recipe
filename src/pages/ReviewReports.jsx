
import { useEffect, useState } from 'react';

const storageKey = 'recipe-review-reports';

// Load reports from localStorage
function loadReports() {

    try {

        const savedReports = localStorage.getItem(storageKey);

        if (!savedReports) {
            return [];
        }

        const parsedReports = JSON.parse(savedReports);

        return Array.isArray(parsedReports) ? parsedReports : [];

    } catch (error) {

        console.error('Unable to load reports:', error);

        return [];

    }

}

function ReviewReports() {

    // State variables
    const [reports, setReports] = useState(loadReports);
    const [filterStatus, setFilterStatus] = useState('Pending');

    // Save reports to localStorage
    useEffect(() => {

        localStorage.setItem(
            storageKey,
            JSON.stringify(reports)
        );

    }, [reports]);

    // Update report status
    function updateReportStatus(reportId, status) {

        setReports((previous) =>
            previous.map((report) =>
                report.id === reportId
                    ? { ...report, status }
                    : report
            )
        );

    }

    // Hide or restore a reported review
    function updateReviewVisibility(report, shouldHide) {

        const reviewStorageKey =
            `recipe-reviews-${report.recipeId}`;

        const savedReviews =
            localStorage.getItem(reviewStorageKey);

        if (!savedReviews) {
            alert('Reviews not found for this recipe.');
            return;
        }

        try {

            const recipeReviews = JSON.parse(savedReviews);

            if (!Array.isArray(recipeReviews)) {
                alert('Invalid review data.');
                return;
            }

            let reviewFound = false;

            const updatedReviews = recipeReviews.map((review) => {

                if (String(review.id) === String(report.reviewId)) {

                    reviewFound = true;

                    return {
                        ...review,
                        isHidden: shouldHide
                    };

                }

                return review;

            });

            if (!reviewFound) {
                alert('The reported review was not found.');
                return;
            }

            // Save updated reviews
            localStorage.setItem(
                reviewStorageKey,
                JSON.stringify(updatedReviews)
            );

            // Update report visibility status
            setReports((previous) =>
                previous.map((item) =>
                    item.id === report.id
                        ? {
                            ...item,
                            reviewHidden: shouldHide
                        }
                        : item
                )
            );

            alert(
                shouldHide
                    ? 'Review hidden successfully!'
                    : 'Review restored successfully!'
            );

        } catch (error) {

            console.error('Unable to update review:', error);
            alert('Something went wrong while updating the review.');

        }

    }

    // Filter reports
    const filteredReports = reports.filter((report) => {

        if (filterStatus === 'All') {
            return true;
        }

        return report.status === filterStatus;

    });

    // Report statistics
    const pendingCount = reports.filter(
        (report) => report.status === 'Pending'
    ).length;

    const reviewedCount = reports.filter(
        (report) => report.status === 'Reviewed'
    ).length;

    const dismissedCount = reports.filter(
        (report) => report.status === 'Dismissed'
    ).length;

    return (

        <div className="review-reports-page">

            <h1>🚩 Review Report Management</h1>

            <p>Manage inappropriate or reported recipe reviews.</p>

            {/* Report Statistics */}
            <div className="report-statistics">

                <div className="report-stat-card">
                    <h3>{reports.length}</h3>
                    <p>Total Reports</p>
                </div>

                <div className="report-stat-card">
                    <h3>{pendingCount}</h3>
                    <p>Pending</p>
                </div>

                <div className="report-stat-card">
                    <h3>{reviewedCount}</h3>
                    <p>Reviewed</p>
                </div>

                <div className="report-stat-card">
                    <h3>{dismissedCount}</h3>
                    <p>Dismissed</p>
                </div>

            </div>

            {/* Filter Reports */}
            <div className="report-filter">

                <label>Filter Reports:</label>

                <select
                    value={filterStatus}
                    onChange={(event) =>
                        setFilterStatus(event.target.value)
                    }
                >
                    <option value="Pending">Pending</option>
                    <option value="Reviewed">Reviewed</option>
                    <option value="Dismissed">Dismissed</option>
                    <option value="All">All Reports</option>
                </select>

            </div>

            {/* Reports List */}
            <div className="reports-list">

                <h2>Reported Reviews</h2>

                {filteredReports.length === 0 ? (

                    <p className="no-reports">
                        No reports found.
                    </p>

                ) : (

                    filteredReports.map((report) => (

                        <div
                            className="reported-review-card"
                            key={report.id}
                        >

                            <div className="reported-review-header">

                                <h3>
                                    Review by {report.reviewName}
                                </h3>

                                <span
                                    className={`report-status ${report.status.toLowerCase()}`}
                                >
                                    {report.status}
                                </span>

                            </div>

                            <p>
                                <strong>Recipe ID:</strong> {report.recipeId}
                            </p>

                            <p>
                                <strong>Rating:</strong> {report.reviewRating} / 5 ⭐
                            </p>

                            <p>
                                <strong>Review:</strong> {report.reviewComment}
                            </p>

                            <p>
                                <strong>Reported By:</strong> {report.reportedBy}
                            </p>

                            <p>
                                <strong>Reason:</strong> {report.reason}
                            </p>

                            <p>
                                <strong>Additional Details:</strong>{' '}
                                {report.details || 'No additional details provided.'}
                            </p>

                            <p>
                                <strong>Report Date:</strong> {report.date}
                            </p>

                            <p>
                                <strong>Review Visibility:</strong>{' '}
                                {report.reviewHidden ? 'Hidden' : 'Visible'}
                            </p>

                            {/* Reviewed and Dismissed Actions */}
                            {report.status === 'Pending' && (

                                <div className="report-management-actions">

                                    <button
                                        className="mark-reviewed-btn"
                                        onClick={() =>
                                            updateReportStatus(
                                                report.id,
                                                'Reviewed'
                                            )
                                        }
                                    >
                                        ✓ Mark as Reviewed
                                    </button>

                                    <button
                                        className="dismiss-report-btn"
                                        onClick={() =>
                                            updateReportStatus(
                                                report.id,
                                                'Dismissed'
                                            )
                                        }
                                    >
                                        ✕ Dismiss Report
                                    </button>

                                </div>

                            )}

                            {/* Hide or Restore Review */}
                            <div className="report-management-actions">

                                {!report.reviewHidden ? (

                                    <button
                                        className="hide-review-btn"
                                        onClick={() =>
                                            updateReviewVisibility(report, true)
                                        }
                                    >
                                        🚫 Hide Review
                                    </button>

                                ) : (

                                    <button
                                        className="restore-review-btn"
                                        onClick={() =>
                                            updateReviewVisibility(report, false)
                                        }
                                    >
                                        ↩️ Restore Review
                                    </button>

                                )}

                            </div>

                        </div>

                    ))

                )}

            </div>

        </div>

    );

}

export default ReviewReports;
