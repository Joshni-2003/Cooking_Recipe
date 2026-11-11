
import RecipeCard from '../components/RecipeCard';
import { Link } from 'react-router-dom';

function Home() {

    const recipes = [
        {
            id: 1,
            name: "Vegetable Biryani",
            category: "Indian",
            time: "40 minutes",
            image: "🍚"
        },
        {
            id: 2,
            name: "Masala Dosa",
            category: "South Indian",
            time: "30 minutes",
            image: "🥞"
        },
        {
            id: 3,
            name: "Chocolate Cake",
            category: "Dessert",
            time: "50 minutes",
            image: "🍰"
        }
    ];

    return (
        <div>

            {/* Hero Section */}

            <section className="hero">

                <h1>Discover Delicious Recipes</h1>

                <p>
                    Explore tasty dishes and learn to cook
                    your favourite food.
                </p>

                <Link to="/recipes" className="explore-btn">
                    Explore Recipes
                </Link>

            </section>

            {/* Featured Recipes */}

            <section className="recipes-section" id="recipes">

                <h2>Featured Recipes</h2>

                <div className="recipe-container">

                    {recipes.map((recipe) => (
                        <RecipeCard
                            key={recipe.id}
                            recipe={recipe}
                        />
                    ))}

                </div>

                <div className="view-all-recipes">

                    <Link to="/recipes" className="explore-btn">
                        View All Recipes
                    </Link>

                </div>

            </section>

            {/* About Section */}

            <section className="about-section" id="about">

                <h2>About Our Portal</h2>

                <p>
                    Discover new dishes and enjoy cooking
                    with our recipe community.
                </p>

            </section>

        </div>
    );
}

export default Home;
