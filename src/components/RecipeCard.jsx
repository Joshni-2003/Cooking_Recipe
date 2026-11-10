function RecipeCard({ recipe }) {

    return (
        <div className="recipe-card">

            <div className="recipe-image">
                {recipe.image}
            </div>

            <h3>{recipe.name}</h3>

            <p>Category: {recipe.category}</p>

            <p>Cooking Time: {recipe.time}</p>

            <button className="view-btn">
                View Recipe
            </button>

        </div>
    );
}

export default RecipeCard;