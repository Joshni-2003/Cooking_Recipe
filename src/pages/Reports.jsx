
import { useState } from 'react';

function Reports() {

    const [reportData] = useState({
        totalUsers: 25,
        totalRecipes: 18,
        totalReviews: 32,
        averageRating: 4.3,
        approved: 10,
        pending: 5,
        rejected: 3
    });

    const [categoryData] = useState([
        { name: 'Indian', count: 8 },
        { name: 'Desserts', count: 4 },
        { name: 'Chinese', count: 3 },
        { name: 'Italian', count: 2 },
        { name: 'Healthy', count: 1 }
    ]);

    const [activities] = useState([
        {
            id: 1,
            activity: 'New recipe submitted',
            user: 'Rahul',
            date: 'November 11, 2026'
        },
        {
            id: 2,
            activity: 'Recipe approved',
            user: 'Priya',
            date: 'November 10, 2026'
        },
        {
            id: 3,
            activity: 'New review added',
            user: 'Arun',
            date: 'November 10, 2026'
        },
        {
            id: 4,
            activity: 'Recipe rejected',
            user: 'Sneha',
            date: 'November 9, 2026'
        }
    ]);

    const totalStatuses =
        reportData.approved +
        reportData.pending +
        reportData.rejected;

    // Calculate percentage for each recipe status
    function calculatePercentage(count) {
        if (totalStatuses === 0) {
            return 0;
        }

        return Math.round((count / totalStatuses) * 100);
    }

    return (
        <div className="reports-page">

            <div className="reports-header">
                <h1>Reports and Analytics 📊</h1>
                <p>Monitor users, recipes, reviews and portal activity.</p>
            </div>

            {/* Summary Cards */}
            <div className="report-summary">

                <div className="report-card">
                    <h3>Total Users</h3>
                    <h2>{reportData.totalUsers}</h2>
                </div>

                <div className="report-card">
                    <h3>Total Recipes</h3>
                    <h2>{reportData.totalRecipes}</h2>
                </div>

                <div className="report-card">
                    <h3>Total Reviews</h3>
                    <h2>{reportData.totalReviews}</h2>
                </div>

                <div className="report-card">
                    <h3>Average Rating</h3>
                    <h2>⭐ {reportData.averageRating}/5</h2>
                </div>

            </div>

            {/* Recipe Status Report */}
            <section className="report-section">

                <h2>Recipe Moderation Statistics</h2>

                <div className="status-report">

                    <div className="status-report-item">
                        <div className="status-report-heading">
                            <span>Approved Recipes</span>
                            <strong>{reportData.approved}</strong>
                        </div>

                        <div className="report-progress">
                            <div
                                className="report-progress-fill approved-fill"
                                style={{
                                    width: `${calculatePercentage(reportData.approved)}%`
                                }}
                            />
                        </div>

                        <small>
                            {calculatePercentage(reportData.approved)}%
                        </small>
                    </div>

                    <div className="status-report-item">
                        <div className="status-report-heading">
                            <span>Pending Recipes</span>
                            <strong>{reportData.pending}</strong>
                        </div>

                        <div className="report-progress">
                            <div
                                className="report-progress-fill pending-fill"
                                style={{
                                    width: `${calculatePercentage(reportData.pending)}%`
                                }}
                            />
                        </div>

                        <small>
                            {calculatePercentage(reportData.pending)}%
                        </small>
                    </div>

                    <div className="status-report-item">
                        <div className="status-report-heading">
                            <span>Rejected Recipes</span>
                            <strong>{reportData.rejected}</strong>
                        </div>

                        <div className="report-progress">
                            <div
                                className="report-progress-fill rejected-fill"
                                style={{
                                    width: `${calculatePercentage(reportData.rejected)}%`
                                }}
                            />
                        </div>

                        <small>
                            {calculatePercentage(reportData.rejected)}%
                        </small>
                    </div>

                </div>

            </section>

            {/* Category Report */}
            <section className="report-section">

                <h2>Recipes by Category</h2>

                <div className="category-report">

                    {categoryData.map((category) => (

                        <div className="category-report-item" key={category.name}>

                            <div className="category-report-heading">
                                <span>{category.name}</span>
                                <strong>{category.count} Recipes</strong>
                            </div>

                            <div className="report-progress">
                                <div
                                    className="report-progress-fill category-fill"
                                    style={{
                                        width: `${(category.count / reportData.totalRecipes) * 100}%`
                                    }}
                                />
                            </div>

                        </div>

                    ))}

                </div>

            </section>

            {/* Recent Activity */}
            <section className="report-section">

                <h2>Recent Portal Activity</h2>

                <div className="activity-table-wrapper">

                    <table className="activity-table">

                        <thead>
                            <tr>
                                <th>Activity</th>
                                <th>User</th>
                                <th>Date</th>
                            </tr>
                        </thead>

                        <tbody>

                            {activities.map((item) => (

                                <tr key={item.id}>
                                    <td>{item.activity}</td>
                                    <td>{item.user}</td>
                                    <td>{item.date}</td>
                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </section>

        </div>
    );
}

export default Reports;
