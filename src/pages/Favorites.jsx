
import { Link } from 'react-router-dom';
import { recipes } from '../data/recipes';
import { useFavorites } from '../context/FavoritesContext';
import RecipeCard from '../components/RecipeCard';

function Favorites() {

    const { favorites } = useFavorites();

    // Get recipes saved in favorites
    const favoriteRecipes = recipes.filter(
        (recipe) => favorites.includes(recipe.id)
    );

    return (
        <div className="favorites-page">

            <h1>❤️ My Favorite Recipes</h1>

            <p>Your saved favourite dishes are here.</p>

            {favoriteRecipes.length === 0 ? (

                <div className="empty-favorites">

                    <h2>No Favorite Recipes Yet!</h2>

                    <p>
                        Explore recipes and add your favourite dishes.
                    </p>

                    <Link to="/recipes" className="explore-btn">
                        Explore Recipes
                    </Link>

                </div>

            ) : (

                <div className="recipe-grid">

                    {favoriteRecipes.map((recipe) => (
                        <RecipeCard
                            key={recipe.id}
                            recipe={recipe}
                        />
                    ))}

                </div>

            )}

        </div>
    );
}

export default Favorites;
