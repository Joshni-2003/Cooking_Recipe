
import { useState } from 'react';

function ModeratorDashboard() {

    const [submittedRecipes, setSubmittedRecipes] = useState([
        {
            id: 1,
            name: 'Chicken Biryani',
            category: 'Indian',
            submittedBy: 'Rahul',
            status: 'Pending',
            description: 'A delicious homemade chicken biryani.',
            reason: ''
        },
        {
            id: 2,
            name: 'Chocolate Brownie',
            category: 'Dessert',
            submittedBy: 'Priya',
            status: 'Pending',
            description: 'A soft and tasty chocolate brownie.',
            reason: ''
        },
        {
            id: 3,
            name: 'Vegetable Fried Rice',
            category: 'Chinese',
            submittedBy: 'Arun',
            status: 'Approved',
            description: 'Healthy vegetable fried rice.',
            reason: ''
        },
        {
            id: 4,
            name: 'Mango Ice Cream',
            category: 'Dessert',
            submittedBy: 'Sneha',
            status: 'Rejected',
            description: 'Homemade mango ice cream.',
            reason: 'Please provide detailed preparation instructions.'
        }
    ]);

    const [filter, setFilter] = useState('All');

    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const [rejectionReason, setRejectionReason] = useState('');

    // Approve recipe
    function approveRecipe(id) {

        const confirmApproval = window.confirm(
            'Are you sure you want to approve this recipe?'
        );

        if (!confirmApproval) {
            return;
        }

        const updatedRecipes = submittedRecipes.map((recipe) => {

            if (recipe.id === id) {
                return {
                    ...recipe,
                    status: 'Approved',
                    reason: ''
                };
            }

            return recipe;
        });

        setSubmittedRecipes(updatedRecipes);
    }

    // Open rejection form
    function openRejectForm(id) {
        setSelectedRecipe(id);
        setRejectionReason('');
    }

    // Confirm recipe rejection
    function rejectRecipe() {

        if (!rejectionReason.trim()) {
            alert('Please enter a rejection reason.');
            return;
        }

        const updatedRecipes = submittedRecipes.map((recipe) => {

            if (recipe.id === selectedRecipe) {
                return {
                    ...recipe,
                    status: 'Rejected',
                    reason: rejectionReason.trim()
                };
            }

            return recipe;
        });

        setSubmittedRecipes(updatedRecipes);

        setSelectedRecipe(null);
        setRejectionReason('');
    }

    // Cancel rejection
    function cancelRejection() {
        setSelectedRecipe(null);
        setRejectionReason('');
    }

    // Filter recipes by status
    const filteredRecipes = submittedRecipes.filter((recipe) => {

        if (filter === 'All') {
            return true;
        }

        return recipe.status === filter;
    });

    // Dashboard counts
    const pendingCount = submittedRecipes.filter(
        (recipe) => recipe.status === 'Pending'
    ).length;

    const approvedCount = submittedRecipes.filter(
        (recipe) => recipe.status === 'Approved'
    ).length;

    const rejectedCount = submittedRecipes.filter(
        (recipe) => recipe.status === 'Rejected'
    ).length;

    // Rejected recipes
    const rejectedRecipes = submittedRecipes.filter(
        (recipe) => recipe.status === 'Rejected'
    );

    return (

        <div className="moderator-dashboard">

            {/* Dashboard Heading */}
            <div className="moderator-header">

                <h1>Moderator Dashboard 🛡️</h1>

                <p>
                    Review and manage recipes submitted by users.
                </p>

            </div>

            {/* Statistics */}
            <div className="moderator-stats">

                <div className="moderator-stat-card">
                    <h2>📝</h2>
                    <h3>{submittedRecipes.length}</h3>
                    <p>Total Submissions</p>
                </div>

                <div className="moderator-stat-card">
                    <h2>⏳</h2>
                    <h3>{pendingCount}</h3>
                    <p>Pending Recipes</p>
                </div>

                <div className="moderator-stat-card">
                    <h2>✅</h2>
                    <h3>{approvedCount}</h3>
                    <p>Approved Recipes</p>
                </div>

                <div className="moderator-stat-card">
                    <h2>❌</h2>
                    <h3>{rejectedCount}</h3>
                    <p>Rejected Recipes</p>
                </div>

            </div>

            {/* Recipe Management */}
            <div className="moderator-recipes">

                <h2>Manage Submitted Recipes</h2>

                {/* Filter */}
                <div className="moderator-filter">

                    <label>Filter by Status:</label>

                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="All">All Recipes</option>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                    </select>

                </div>

                {/* Recipe List */}
                {filteredRecipes.length === 0 ? (

                    <p className="no-submissions">
                        No recipes found.
                    </p>

                ) : (

                    <div className="moderator-recipe-list">

                        {filteredRecipes.map((recipe) => (

                            <div
                                className="moderator-recipe-card"
                                key={recipe.id}
                            >

                                <h3>{recipe.name}</h3>

                                <p>
                                    <strong>Category:</strong> {recipe.category}
                                </p>

                                <p>
                                    <strong>Submitted By:</strong> {recipe.submittedBy}
                                </p>

                                <p>
                                    <strong>Description:</strong> {recipe.description}
                                </p>

                                <p>
                                    <strong>Status:</strong>

                                    <span className={`status ${recipe.status.toLowerCase()}`}>
                                        {recipe.status}
                                    </span>

                                </p>

                                {/* Action Buttons */}
                                {recipe.status === 'Pending' && (

                                    <div className="moderator-actions">

                                        <button
                                            className="approve-btn"
                                            onClick={() => approveRecipe(recipe.id)}
                                        >
                                            Approve
                                        </button>

                                        <button
                                            className="reject-btn"
                                            onClick={() => openRejectForm(recipe.id)}
                                        >
                                            Reject
                                        </button>

                                    </div>

                                )}

                                {/* Rejection Feedback */}
                                {recipe.status === 'Rejected' && (

                                    <div className="recipe-rejection-reason">
                                        <strong>Rejection Reason:</strong>
                                        <p>{recipe.reason}</p>
                                    </div>

                                )}

                            </div>

                        ))}

                    </div>

                )}

                {/* Rejection Form */}
                {selectedRecipe !== null && (

                    <div className="rejection-form">

                        <h2>Reject Recipe</h2>

                        <label htmlFor="rejectionReason">
                            Enter Rejection Reason:
                        </label>

                        <textarea
                            id="rejectionReason"
                            rows="4"
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            placeholder="Explain why this recipe is rejected..."
                        />

                        <div className="rejection-actions">

                            <button
                                className="confirm-reject-btn"
                                onClick={rejectRecipe}
                            >
                                Confirm Rejection
                            </button>

                            <button
                                className="cancel-reject-btn"
                                onClick={cancelRejection}
                            >
                                Cancel
                            </button>

                        </div>

                    </div>

                )}

                {/* Rejection History */}
                <div className="rejection-history">

                    <h2>Rejection History</h2>

                    {rejectedRecipes.length === 0 ? (

                        <p>No rejected recipes yet.</p>

                    ) : (

                        rejectedRecipes.map((recipe) => (

                            <div
                                className="rejection-item"
                                key={recipe.id}
                            >

                                <h3>{recipe.name}</h3>

                                <p>
                                    <strong>Submitted By:</strong> {recipe.submittedBy}
                                </p>

                                <p>
                                    <strong>Reason:</strong> {recipe.reason}
                                </p>

                            </div>

                        ))

                    )}

                </div>

            </div>

        </div>
    );
}

export default ModeratorDashboard;
