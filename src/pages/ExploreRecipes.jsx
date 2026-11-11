
import { useState } from 'react';

import { recipes } from '../data/recipes';
import RecipeCard from '../components/RecipeCard';

function ExploreRecipes() {

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedTime, setSelectedTime] = useState('All');
    const [sortOption, setSortOption] = useState('default');

    // Get unique categories
    const categories = [
        'All',
        ...new Set(recipes.map((recipe) => recipe.category))
    ];

    // Filter recipes
    const filteredRecipes = recipes.filter((recipe) => {

        const search = searchTerm.toLowerCase().trim();

        const matchesSearch =
            recipe.name.toLowerCase().includes(search) ||
            recipe.category.toLowerCase().includes(search) ||
            (recipe.description || '').toLowerCase().includes(search);

        const matchesCategory =
            selectedCategory === 'All' ||
            recipe.category === selectedCategory;

        const cookingTime = parseInt(recipe.time, 10);

        const matchesTime =
            selectedTime === 'All' ||
            (
                !isNaN(cookingTime) &&
                cookingTime <= Number(selectedTime)
            );

        return matchesSearch && matchesCategory && matchesTime;

    });

    // Sort recipes
    const sortedRecipes = [...filteredRecipes].sort((a, b) => {

        const timeA = parseInt(a.time, 10);
        const timeB = parseInt(b.time, 10);

        switch (sortOption) {

            case 'name-asc':
                return a.name.localeCompare(b.name);

            case 'name-desc':
                return b.name.localeCompare(a.name);

            case 'time-asc':
                return timeA - timeB;

            case 'time-desc':
                return timeB - timeA;

            default:
                return 0;
        }

    });

    // Clear filters
    function clearFilters() {

        setSearchTerm('');
        setSelectedCategory('All');
        setSelectedTime('All');
        setSortOption('default');

    }

    return (

        <div className="explore-page">

            <h1>Explore Recipes 🍲</h1>

            <p className="explore-description">
                Discover delicious recipes and find your
                favorite dishes.
            </p>

            {/* Search and Filters */}

            <div className="recipe-filter-section">

                {/* Search */}

                <input
                    type="search"
                    placeholder="Search recipes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="recipe-search-input"
                    aria-label="Search recipes by name, category or description"
                />

                {/* Category Filter */}

                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="recipe-filter-select"
                    aria-label="Filter by category"
                >

                    {categories.map((category) => (

                        <option key={category} value={category}>
                            {category === 'All'
                                ? 'All Categories'
                                : category}
                        </option>

                    ))}

                </select>

                {/* Cooking Time Filter */}

                <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="recipe-filter-select"
                    aria-label="Filter by cooking time"
                >

                    <option value="All">Any Cooking Time</option>
                    <option value="15">Up to 15 minutes</option>
                    <option value="30">Up to 30 minutes</option>
                    <option value="45">Up to 45 minutes</option>
                    <option value="60">Up to 60 minutes</option>

                </select>

                {/* Sorting */}

                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="recipe-filter-select"
                    aria-label="Sort recipes"
                >

                    <option value="default">Default Order</option>
                    <option value="name-asc">Name: A to Z</option>
                    <option value="name-desc">Name: Z to A</option>
                    <option value="time-asc">Cooking Time: Low to High</option>
                    <option value="time-desc">Cooking Time: High to Low</option>

                </select>

                {/* Clear Filters */}

                <button
                    type="button"
                    onClick={clearFilters}
                    className="clear-filter-btn"
                >
                    Clear All
                </button>

            </div>

            {/* Result Count */}

            <div className="recipe-result-count">

                <p aria-live="polite">
                    Showing {sortedRecipes.length} of {recipes.length} recipes
                </p>

            </div>

            {/* Recipe Cards */}

            <div className="recipes-grid">

                {sortedRecipes.length > 0 ? (

                    sortedRecipes.map((recipe) => (

                        <RecipeCard
                            key={recipe.id}
                            recipe={recipe}
                        />

                    ))

                ) : (

                    <div className="no-recipes-found">

                        <h2>No Recipes Found 😕</h2>

                        <p>
                            Sorry, we couldn't find any matching recipes.
                            Try another search or change your filters.
                        </p>

                        <button
                            type="button"
                            onClick={clearFilters}
                        >
                            Show All Recipes
                        </button>

                    </div>

                )}

            </div>

        </div>

    );

}

export default ExploreRecipes;
