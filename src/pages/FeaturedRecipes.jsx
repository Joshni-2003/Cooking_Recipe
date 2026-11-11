
import { useState } from 'react';

function FeaturedRecipes() {

    const [recipes, setRecipes] = useState([
        {
            id: 1,
            name: 'Vegetable Biryani',
            category: 'Indian',
            description: 'A delicious and flavorful vegetable biryani.',
            featured: true
        },
        {
            id: 2,
            name: 'Masala Dosa',
            category: 'Indian',
            description: 'Crispy dosa served with chutney and sambar.',
            featured: false
        },
        {
            id: 3,
            name: 'Chocolate Cake',
            category: 'Dessert',
            description: 'A soft and rich chocolate cake.',
            featured: true
        },
        {
            id: 4,
            name: 'Paneer Butter Masala',
            category: 'Indian',
            description: 'Creamy paneer cooked in a rich tomato gravy.',
            featured: false
        },
        {
            id: 5,
            name: 'Fruit Salad',
            category: 'Healthy',
            description: 'A refreshing mix of fresh fruits.',
            featured: false
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('All');
    const [message, setMessage] = useState('');

    // Count featured recipes
    const featuredCount = recipes.filter(
        (recipe) => recipe.featured
    ).length;

    // Search and filter recipes
    const filteredRecipes = recipes.filter((recipe) => {

        const matchesSearch = recipe.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const matchesFilter =
            filter === 'All' ||
            (filter === 'Featured' && recipe.featured) ||
            (filter === 'Not Featured' && !recipe.featured);

        return matchesSearch && matchesFilter;
    });

    // Add or remove featured status
    function toggleFeatured(id) {

        setRecipes((previousRecipes) =>
            previousRecipes.map((recipe) =>
                recipe.id === id
                    ? { ...recipe, featured: !recipe.featured }
                    : recipe
            )
        );

        const selectedRecipe = recipes.find(
            (recipe) => recipe.id === id
        );

        setMessage(
            selectedRecipe.featured
                ? 'Recipe removed from featured list.'
                : 'Recipe added to featured list!'
        );
    }

    return (
        <div className="featured-recipes-page">

            <div className="featured-recipes-header">
                <h1>Featured Recipes ⭐</h1>
                <p>Select recipes to highlight on the home page.</p>
            </div>

            {/* Featured count */}
            <div className="featured-count-card">
                <h2>{featuredCount}</h2>
                <p>Total Featured Recipes</p>
            </div>

            {message && (
                <p className="featured-message">
                    {message}
                </p>
            )}

            {/* Search and filter */}
            <div className="featured-controls">

                <input
                    type="text"
                    placeholder="Search recipes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="All">All Recipes</option>
                    <option value="Featured">Featured</option>
                    <option value="Not Featured">Not Featured</option>
                </select>

            </div>

            {/* Recipe cards */}
            <div className="featured-recipes-list">

                {filteredRecipes.length === 0 ? (

                    <div className="no-featured-recipes">
                        <h2>No Recipes Found</h2>
                        <p>Try another search or filter.</p>
                    </div>

                ) : (

                    filteredRecipes.map((recipe) => (

                        <div className="featured-recipe-card" key={recipe.id}>

                            <div className="featured-recipe-info">

                                <h2>{recipe.name}</h2>

                                <p>
                                    Category: {recipe.category}
                                </p>

                                <p>{recipe.description}</p>

                                <span className={
                                    recipe.featured
                                        ? 'featured-status active'
                                        : 'featured-status inactive'
                                }>
                                    {recipe.featured
                                        ? 'Featured'
                                        : 'Not Featured'}
                                </span>

                            </div>

                            <button
                                className={
                                    recipe.featured
                                        ? 'remove-featured-btn'
                                        : 'make-featured-btn'
                                }
                                onClick={() => toggleFeatured(recipe.id)}
                            >
                                {recipe.featured
                                    ? 'Remove from Featured'
                                    : 'Make Featured'}
                            </button>

                        </div>

                    ))

                )}

            </div>

        </div>
    );
}

export default FeaturedRecipes;
