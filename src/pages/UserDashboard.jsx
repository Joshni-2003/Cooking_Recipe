
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { recipes } from '../data/recipes';

// Read favorite count from localStorage
function loadFavoriteCount() {

    try {

        const savedFavorites = localStorage.getItem('favorites');

        if (!savedFavorites) {
            return 0;
        }

        const favoriteIds = JSON.parse(savedFavorites);

        return Array.isArray(favoriteIds) ? favoriteIds.length : 0;

    } catch (error) {

        console.error('Unable to load favorites:', error);

        return 0;

    }

}

function UserDashboard() {

    const { user } = useAuth();

    const [favoriteCount] = useState(loadFavoriteCount);

    // Calculate categories from the recipe data
    const categoryCount = new Set(
        recipes.map((recipe) => recipe.category)
    ).size;

    // Calculate total cooking instructions
    const instructionCount = recipes.reduce(
        (total, recipe) => total + recipe.instructions.length,
        0
    );

    // Dynamic dashboard statistics
    const stats = [
        {
            title: 'Available Recipes',
            count: recipes.length,
            icon: '🍲'
        },
        {
            title: 'My Favorites',
            count: favoriteCount,
            icon: '❤️'
        },
        {
            title: 'Recipe Categories',
            count: categoryCount,
            icon: '📂'
        },
        {
            title: 'Cooking Steps',
            count: instructionCount,
            icon: '📝'
        }
    ];

    // Sample recent activities
    const activities = [
        {
            id: 1,
            activity: 'You created Vegetable Biryani',
            date: 'November 11, 2026'
        },
        {
            id: 2,
            activity: 'You added Chocolate Cake to Favorites',
            date: 'November 10, 2026'
        },
        {
            id: 3,
            activity: 'You submitted Paneer Butter Masala',
            date: 'November 9, 2026'
        },
        {
            id: 4,
            activity: 'You reviewed Masala Dosa',
            date: 'November 8, 2026'
        }
    ];

    return (

        <div className="user-dashboard">

            {/* Welcome Section */}
            <section className="dashboard-welcome">

                <div>
                    <h1>Welcome Back! 👋</h1>

                    <p>
                        Hello, {user?.email || 'User'}
                    </p>

                    <p>
                        Manage your recipes, favorites and reviews
                        from your dashboard.
                    </p>
                </div>

                <Link
                    to="/create-recipe"
                    className="dashboard-create-btn"
                >
                    + Create Recipe
                </Link>

            </section>

            {/* Dynamic Statistics */}
            <section className="dashboard-stats">

                <h2>My Statistics</h2>

                <div className="dashboard-stats-grid">

                    {stats.map((item) => (

                        <div
                            className="dashboard-stat-card"
                            key={item.title}
                        >

                            <div className="dashboard-stat-icon">
                                {item.icon}
                            </div>

                            <h3>{item.count}</h3>

                            <p>{item.title}</p>

                        </div>

                    ))}

                </div>

            </section>

            {/* Quick Links */}
            <section className="dashboard-quick-links">

                <h2>Quick Access</h2>

                <div className="quick-links-grid">

                    <Link to="/profile" className="quick-link-card">
                        <span>👤</span>
                        <h3>My Profile</h3>
                        <p>View and update your profile</p>
                    </Link>

                    <Link to="/my-recipes" className="quick-link-card">
                        <span>🍲</span>
                        <h3>My Recipes</h3>
                        <p>Manage your recipes</p>
                    </Link>

                    <Link to="/my-drafts" className="quick-link-card">
                        <span>📝</span>
                        <h3>My Drafts</h3>
                        <p>Continue editing your drafts</p>
                    </Link>

                    <Link to="/favorites" className="quick-link-card">
                        <span>❤️</span>
                        <h3>Favorites</h3>
                        <p>View your favorite recipes</p>
                    </Link>

                    <Link to="/my-reviews" className="quick-link-card">
                        <span>⭐</span>
                        <h3>My Reviews</h3>
                        <p>Manage your reviews</p>
                    </Link>

                    <Link to="/recipes" className="quick-link-card">
                        <span>🔍</span>
                        <h3>Explore Recipes</h3>
                        <p>Discover new recipes</p>
                    </Link>

                </div>

            </section>

            {/* Recent Activity */}
            <section className="dashboard-activity">

                <h2>Recent Activity</h2>

                {activities.map((item) => (

                    <div
                        className="activity-card"
                        key={item.id}
                    >

                        <div>
                            <h4>{item.activity}</h4>
                            <p>{item.date}</p>
                        </div>

                        <span>✓</span>

                    </div>

                ))}

            </section>

        </div>
    );
}

export default UserDashboard;
