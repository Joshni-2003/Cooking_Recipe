
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

function RecipeCard({ recipe }) {

    const { toggleFavorite, isFavorite } = useFavorites();

    const favorite = isFavorite(recipe.id);

    return (
        <div className="recipe-card">

            <div className="recipe-image-container">

                <div className="recipe-image">
                    {recipe.image}
                </div>

                <button
                    type="button"
                    className="favorite-btn"
                    onClick={() => toggleFavorite(recipe.id)}
                    aria-label={
                        favorite
                            ? "Remove from favorites"
                            : "Add to favorites"
                    }
                >
                    {favorite ? "❤️" : "🤍"}
                </button>

            </div>

            <div className="recipe-card-content">

                <h3>{recipe.name}</h3>

                <p>Category: {recipe.category}</p>

                <p>Cooking Time: {recipe.time}</p>

                <Link
                    to={`/recipes/${recipe.id}`}
                    className="view-recipe-btn"
                >
                    View Recipe
                </Link>

            </div>

        </div>
    );
}

export default RecipeCard;
