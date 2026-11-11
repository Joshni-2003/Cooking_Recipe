
import { useState } from 'react';

function AdminDashboard() {

    // Sample user data
    const [users, setUsers] = useState([
        {
            id: 1,
            name: 'Rahul',
            email: 'rahul@gmail.com',
            role: 'User',
            status: 'Active'
        },
        {
            id: 2,
            name: 'Priya',
            email: 'priya@gmail.com',
            role: 'User',
            status: 'Active'
        },
        {
            id: 3,
            name: 'Arun',
            email: 'arun@gmail.com',
            role: 'Moderator',
            status: 'Active'
        },
        {
            id: 4,
            name: 'Sneha',
            email: 'sneha@gmail.com',
            role: 'User',
            status: 'Inactive'
        }
    ]);

    // Sample recipe data
    const [recipes, setRecipes] = useState([
        {
            id: 1,
            name: 'Vegetable Biryani',
            category: 'Indian',
            submittedBy: 'Rahul',
            status: 'Approved'
        },
        {
            id: 2,
            name: 'Chocolate Cake',
            category: 'Dessert',
            submittedBy: 'Priya',
            status: 'Pending'
        },
        {
            id: 3,
            name: 'Masala Dosa',
            category: 'South Indian',
            submittedBy: 'Arun',
            status: 'Approved'
        },
        {
            id: 4,
            name: 'Fruit Salad',
            category: 'Dessert',
            submittedBy: 'Sneha',
            status: 'Pending'
        }
    ]);

    const [activeTab, setActiveTab] = useState('users');

    // Activate or deactivate user
    function toggleUserStatus(id) {

        const updatedUsers = users.map((user) => {

            if (user.id === id) {

                return {
                    ...user,
                    status: user.status === 'Active'
                        ? 'Inactive'
                        : 'Active'
                };

            }

            return user;
        });

        setUsers(updatedUsers);
    }

    // Delete a user
    function deleteUser(id) {

        const confirmDelete = window.confirm(
            'Are you sure you want to delete this user?'
        );

        if (confirmDelete) {

            setUsers(
                users.filter((user) => user.id !== id)
            );

        }
    }

    // Delete a recipe
    function deleteRecipe(id) {

        const confirmDelete = window.confirm(
            'Are you sure you want to delete this recipe?'
        );

        if (confirmDelete) {

            setRecipes(
                recipes.filter((recipe) => recipe.id !== id)
            );

        }
    }

    // Approve or reject a recipe
    function updateRecipeStatus(id, newStatus) {

        const updatedRecipes = recipes.map((recipe) => {

            if (recipe.id === id) {

                return {
                    ...recipe,
                    status: newStatus
                };

            }

            return recipe;
        });

        setRecipes(updatedRecipes);
    }

    const pendingCount = recipes.filter(
        (recipe) => recipe.status === 'Pending'
    ).length;

    return (

        <div className="admin-dashboard">

            {/* Header */}
            <div className="admin-header">

                <h1>Admin Dashboard 👨‍💻</h1>

                <p>
                    Welcome, Admin! Manage users and recipes here.
                </p>

            </div>

            {/* Statistics */}
            <div className="admin-stats">

                <div className="admin-stat-card">
                    <h2>👥</h2>
                    <h3>{users.length}</h3>
                    <p>Total Users</p>
                </div>

                <div className="admin-stat-card">
                    <h2>🍲</h2>
                    <h3>{recipes.length}</h3>
                    <p>Total Recipes</p>
                </div>

                <div className="admin-stat-card">
                    <h2>⏳</h2>
                    <h3>{pendingCount}</h3>
                    <p>Pending Recipes</p>
                </div>

                <div className="admin-stat-card">
                    <h2>✅</h2>
                    <h3>
                        {recipes.filter(
                            (recipe) => recipe.status === 'Approved'
                        ).length}
                    </h3>
                    <p>Approved Recipes</p>
                </div>

            </div>

            {/* Management Tabs */}
            <div className="admin-management">

                <div className="admin-tabs">

                    <button
                        className={activeTab === 'users' ? 'active-tab' : ''}
                        onClick={() => setActiveTab('users')}
                    >
                        Manage Users
                    </button>

                    <button
                        className={activeTab === 'recipes' ? 'active-tab' : ''}
                        onClick={() => setActiveTab('recipes')}
                    >
                        Manage Recipes
                    </button>

                </div>

                {/* User Management */}
                {activeTab === 'users' && (

                    <div className="admin-table-section">

                        <h2>Registered Users</h2>

                        <div className="admin-table-wrapper">

                            <table className="admin-table">

                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {users.map((user) => (

                                        <tr key={user.id}>

                                            <td>{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>

                                            <td>
                                                <span className={`admin-status ${user.status.toLowerCase()}`}>
                                                    {user.status}
                                                </span>
                                            </td>

                                            <td>

                                                <div className="admin-action-buttons">

                                                    <button
                                                        className="toggle-user-btn"
                                                        onClick={() => toggleUserStatus(user.id)}
                                                    >
                                                        {user.status === 'Active'
                                                            ? 'Deactivate'
                                                            : 'Activate'}
                                                    </button>

                                                    <button
                                                        className="delete-admin-btn"
                                                        onClick={() => deleteUser(user.id)}
                                                    >
                                                        Delete
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                        {users.length === 0 && (
                            <p className="admin-empty">
                                No users available.
                            </p>
                        )}

                    </div>

                )}

                {/* Recipe Management */}
                {activeTab === 'recipes' && (

                    <div className="admin-table-section">

                        <h2>Manage Recipes</h2>

                        <div className="admin-table-wrapper">

                            <table className="admin-table">

                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Recipe Name</th>
                                        <th>Category</th>
                                        <th>Submitted By</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {recipes.map((recipe) => (

                                        <tr key={recipe.id}>

                                            <td>{recipe.id}</td>
                                            <td>{recipe.name}</td>
                                            <td>{recipe.category}</td>
                                            <td>{recipe.submittedBy}</td>

                                            <td>
                                                <span className={`admin-status ${recipe.status.toLowerCase()}`}>
                                                    {recipe.status}
                                                </span>
                                            </td>

                                            <td>

                                                <div className="admin-action-buttons">

                                                    {recipe.status === 'Pending' && (

                                                        <button
                                                            className="approve-admin-btn"
                                                            onClick={() => updateRecipeStatus(recipe.id, 'Approved')}
                                                        >
                                                            Approve
                                                        </button>

                                                    )}

                                                    {recipe.status === 'Pending' && (

                                                        <button
                                                            className="reject-admin-btn"
                                                            onClick={() => updateRecipeStatus(recipe.id, 'Rejected')}
                                                        >
                                                            Reject
                                                        </button>

                                                    )}

                                                    <button
                                                        className="delete-admin-btn"
                                                        onClick={() => deleteRecipe(recipe.id)}
                                                    >
                                                        Delete
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                        {recipes.length === 0 && (
                            <p className="admin-empty">
                                No recipes available.
                            </p>
                        )}

                    </div>

                )}

            </div>

        </div>
    );
}

export default AdminDashboard;
