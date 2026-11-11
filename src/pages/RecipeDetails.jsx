
/* eslint-disable react-hooks/set-state-in-effect */

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { recipes } from '../data/recipes';
import ReviewSection from '../components/ReviewSection';

function RecipeDetails() {

    const { id } = useParams();

    const recipe = recipes.find(
        (item) => item.id === Number(id)
    );

    // Servings state
    const [servings, setServings] = useState(
        recipe ? recipe.servings || 2 : 2
    );

    // Cooking timer calculation
    const totalSeconds = Math.max(
        1,
        (parseInt(recipe?.time, 10) || 1) * 60
    );

    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    // Ingredients checklist
    const [checkedIngredients, setCheckedIngredients] = useState({});

    // Cooking instructions checklist
    const [completedSteps, setCompletedSteps] = useState({});

    // Track saved progress loading
    const [progressLoadedFor, setProgressLoadedFor] = useState(null);

    // Recipe ingredients and instructions
    const ingredients = recipe?.ingredients || [];
    const instructions = recipe?.instructions || [];

    // Format cooking time
    function formatDuration(value) {

        if (value === undefined || value === null || value === '') {
            return 'Not specified';
        }

        const time = String(value).trim();

        if (/minutes?|mins?/i.test(time)) {
            return time;
        }

        return `${time} minutes`;
    }

    // Load saved cooking progress
    useEffect(() => {

        if (!recipe) return;

        const storageKey = `cookingProgress_${recipe.id}`;

        const savedProgress = localStorage.getItem(storageKey);

        if (savedProgress) {

            try {

                const progressData = JSON.parse(savedProgress);

                setCheckedIngredients(
                    progressData.checkedIngredients || {}
                );

                setCompletedSteps(
                    progressData.completedSteps || {}
                );

                setElapsedSeconds(
                    progressData.elapsedSeconds || 0
                );

                setServings(
                    progressData.servings || recipe.servings || 2
                );

            } catch (error) {

                console.error(
                    'Unable to load saved progress:',
                    error
                );

                setCheckedIngredients({});
                setCompletedSteps({});
                setElapsedSeconds(0);
                setServings(recipe.servings || 2);

            }

        } else {

            setCheckedIngredients({});
            setCompletedSteps({});
            setElapsedSeconds(0);
            setServings(recipe.servings || 2);

        }

        setIsRunning(false);
        setProgressLoadedFor(recipe.id);

    }, [recipe]);

    // Save cooking progress automatically
    useEffect(() => {

        if (!recipe) return;

        if (progressLoadedFor !== recipe.id) return;

        const storageKey = `cookingProgress_${recipe.id}`;

        const progressData = {
            checkedIngredients,
            completedSteps,
            elapsedSeconds,
            servings
        };

        localStorage.setItem(
            storageKey,
            JSON.stringify(progressData)
        );

    }, [
        recipe,
        progressLoadedFor,
        checkedIngredients,
        completedSteps,
        elapsedSeconds,
        servings
    ]);

    // Cooking timer
    useEffect(() => {

        if (!isRunning) return;

        const timer = setInterval(() => {

            setElapsedSeconds((previous) =>
                Math.min(previous + 1, totalSeconds)
            );

        }, 1000);

        return () => clearInterval(timer);

    }, [isRunning, totalSeconds]);

    // Stop timer when completed
    useEffect(() => {

        if (elapsedSeconds >= totalSeconds) {
            setIsRunning(false);
        }

    }, [elapsedSeconds, totalSeconds]);

    // Recipe not found
    if (!recipe) {

        return (
            <div className="recipe-not-found">

                <h2>Recipe Not Found!</h2>

                <p>
                    Sorry, the recipe you are looking for does not exist.
                </p>

                <Link to="/recipes">
                    Back to Recipes
                </Link>

            </div>
        );
    }

    // Calculate ingredient quantity
    function calculateQuantity(quantity) {

        const originalServings = recipe.servings || 1;

        const result =
            Number(quantity) * servings / originalServings;

        return Number(result.toFixed(2));
    }

    // Format timer
    function formatTime(seconds) {

        const minutes = Math.floor(seconds / 60);

        const remainingSeconds = seconds % 60;

        return `${String(minutes).padStart(2, '0')}:${String(
            remainingSeconds
        ).padStart(2, '0')}`;
    }

    // Timer progress
    const progress = Math.round(
        (elapsedSeconds / totalSeconds) * 100
    );

    // Reset timer
    function resetTimer() {

        setIsRunning(false);
        setElapsedSeconds(0);

    }

    // Print recipe
    function printRecipe() {

        window.print();

    }

    // Download recipe as PDF
    function downloadRecipePDF() {

        window.print();

    }

    // Copy recipe link
    async function copyRecipeLink() {

        const recipeUrl = window.location.href;

        try {

            await navigator.clipboard.writeText(recipeUrl);

            alert('Recipe link copied successfully!');

        } catch {

            alert(
                'Unable to copy the link. Copy it from the browser address bar.'
            );

        }
    }

    // Share on WhatsApp
    function shareOnWhatsApp() {

        const recipeUrl = window.location.href;

        const message =
            `Check out this delicious recipe: ${recipe.name} ${recipeUrl}`;

        window.open(
            `https://wa.me/?text=${encodeURIComponent(message)}`,
            '_blank',
            'noopener,noreferrer'
        );

    }

    // Share on Facebook
    function shareOnFacebook() {

        const recipeUrl = window.location.href;

        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(recipeUrl)}`,
            '_blank',
            'noopener,noreferrer'
        );

    }

    // Share through Gmail
    function shareByEmail() {

        const recipeUrl = window.location.href;

        const subject = `Try this recipe: ${recipe.name}`;

        const body =
            `Hello! Check out this delicious recipe: ${recipe.name}\n\n${recipeUrl}`;

        const gmailUrl =
            `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.open(
            gmailUrl,
            '_blank',
            'noopener,noreferrer'
        );

    }

    // Toggle ingredient checkbox
    function toggleIngredient(index) {

        setCheckedIngredients((previous) => ({

            ...previous,

            [index]: !previous[index]

        }));

    }

    // Reset ingredient checklist
    function resetIngredientChecklist() {

        setCheckedIngredients({});

    }

    // Completed ingredients
    const completedIngredients = Object.values(
        checkedIngredients
    ).filter(Boolean).length;

    // Total ingredients
    const totalIngredients = ingredients.length;

    // Ingredient progress
    const ingredientProgress = totalIngredients > 0
        ? Math.round(
            (completedIngredients / totalIngredients) * 100
        )
        : 0;

    // Toggle cooking step
    function toggleStep(index) {

        setCompletedSteps((previous) => ({

            ...previous,

            [index]: !previous[index]

        }));

    }

    // Reset cooking steps
    function resetStepsChecklist() {

        setCompletedSteps({});

    }

    // Completed steps
    const completedStepsCount = Object.values(
        completedSteps
    ).filter(Boolean).length;

    // Total steps
    const totalSteps = instructions.length;

    // Steps progress
    const stepsProgress = totalSteps > 0
        ? Math.round(
            (completedStepsCount / totalSteps) * 100
        )
        : 0;

    // Clear all saved progress
    function clearSavedProgress() {

        const storageKey = `cookingProgress_${recipe.id}`;

        localStorage.removeItem(storageKey);

        setCheckedIngredients({});
        setCompletedSteps({});
        setElapsedSeconds(0);
        setIsRunning(false);
        setServings(recipe.servings || 2);

    }

    // Overall cooking progress
    const totalTasks = totalIngredients + totalSteps;

    const completedTasks =
        completedIngredients + completedStepsCount;

    const overallProgress = totalTasks > 0
        ? Math.round(
            (completedTasks / totalTasks) * 100
        )
        : 0;

    // Recipe completion achievement
    const isRecipeCompleted =
        totalTasks > 0 && overallProgress === 100;

    return (

        <div className="details-page">

            {/* Recipe Header */}

            <section className="details-header">

                <div className="details-image">
                    {recipe.image}
                </div>

                <div className="recipe-heading">

                    <h1>{recipe.name}</h1>

                    <p className="recipe-description">
                        {recipe.description}
                    </p>

                    <div className="recipe-meta">

                        <span>📂 {recipe.category}</span>

                        <span>🌍 {recipe.cuisine}</span>

                        <span>
                            ⏱️ Preparation: {formatDuration(recipe.preparationTime)}
                        </span>

                        <span>
                            🍳 Cooking: {formatDuration(recipe.time)}
                        </span>

                        <span>
                            ⭐ Difficulty: {recipe.difficulty || 'Not specified'}
                        </span>

                    </div>

                </div>

            </section>

            {/* Cooking Timer */}

            <section className="cooking-timer-section no-print">

                <h2>⏱️ Cooking Time Progress</h2>

                <p>
                    Estimated Cooking Time: {formatDuration(recipe.time)}
                </p>

                <h3 className="timer-display">
                    {formatTime(elapsedSeconds)}
                </h3>

                <div className="progress-container">

                    <div
                        className="progress-bar"
                        style={{ width: `${progress}%` }}
                    ></div>

                </div>

                <p className="progress-text">
                    {progress}% Completed
                </p>

                {progress === 100 && (

                    <h3 className="cooking-completed">
                        🎉 Cooking Completed!
                    </h3>

                )}

                <div className="timer-buttons">

                    <button
                        onClick={() => setIsRunning(true)}
                        disabled={isRunning || progress === 100}
                    >
                        {progress === 100 ? 'Completed' : 'Start Cooking'}
                    </button>

                    <button
                        onClick={() => setIsRunning(false)}
                        disabled={!isRunning}
                    >
                        Pause
                    </button>

                    <button onClick={resetTimer}>
                        Reset
                    </button>

                </div>

            </section>

            {/* Print and Download PDF */}

            <div className="print-recipe-section no-print">

                <button onClick={printRecipe}>
                    🖨️ Print Recipe
                </button>

                <button onClick={downloadRecipePDF}>
                    📥 Download Recipe as PDF
                </button>

            </div>

            {/* Servings */}

            <section className="servings-section">

                <h2>Adjust Servings</h2>

                <div className="servings-controls">

                    <button
                        type="button"
                        onClick={() => {

                            if (servings > 1) {
                                setServings(servings - 1);
                            }

                        }}
                        disabled={servings <= 1}
                        aria-label="Decrease servings"
                    >
                        -
                    </button>

                    <span>{servings} Servings</span>

                    <button
                        type="button"
                        onClick={() => setServings(servings + 1)}
                        aria-label="Increase servings"
                    >
                        +
                    </button>

                </div>

            </section>

            {/* Ingredients Checklist */}

            <section className="details-section">

                <h2>🥕 Ingredients Checklist</h2>

                <p>
                    Select the ingredients as you collect them.
                </p>

                <div className="ingredient-progress-info">

                    <strong>
                        {completedIngredients} / {totalIngredients} Ingredients Completed
                    </strong>

                    <span>{ingredientProgress}%</span>

                </div>

                <div className="ingredient-check-progress">

                    <div
                        className="ingredient-check-bar"
                        style={{ width: `${ingredientProgress}%` }}
                    ></div>

                </div>

                <ul className="ingredient-list">

                    {ingredients.map((ingredient, index) => (

                        <li
                            key={index}
                            className={
                                checkedIngredients[index]
                                    ? 'ingredient-completed'
                                    : ''
                            }
                        >

                            <label className="ingredient-checkbox">

                                <input
                                    type="checkbox"
                                    checked={!!checkedIngredients[index]}
                                    onChange={() => toggleIngredient(index)}
                                />

                                <span>{ingredient.name}</span>

                            </label>

                            <strong>
                                {calculateQuantity(ingredient.quantity)} {ingredient.unit}
                            </strong>

                        </li>

                    ))}

                </ul>

                <button
                    type="button"
                    className="reset-ingredient-btn no-print"
                    onClick={resetIngredientChecklist}
                >
                    Reset Checklist
                </button>

                {ingredientProgress === 100 && totalIngredients > 0 && (

                    <h3 className="ingredient-success">
                        🎉 All ingredients are ready!
                    </h3>

                )}

            </section>

            {/* Cooking Instructions Checklist */}

            <section className="details-section">

                <h2>👩‍🍳 Cooking Instructions Checklist</h2>

                <p>
                    Tick each step after completing it.
                </p>

                <div className="steps-progress-info">

                    <strong>
                        {completedStepsCount} / {totalSteps} Steps Completed
                    </strong>

                    <span>{stepsProgress}%</span>

                </div>

                <div className="steps-check-progress">

                    <div
                        className="steps-check-bar"
                        style={{ width: `${stepsProgress}%` }}
                    ></div>

                </div>

                <ol className="instruction-list">

                    {instructions.map((step, index) => (

                        <li
                            key={index}
                            className={
                                completedSteps[index]
                                    ? 'step-completed'
                                    : ''
                            }
                        >

                            <label className="step-checkbox">

                                <input
                                    type="checkbox"
                                    checked={!!completedSteps[index]}
                                    onChange={() => toggleStep(index)}
                                />

                                <span>Step {index + 1}</span>

                            </label>

                            <p>{step}</p>

                        </li>

                    ))}

                </ol>

                <button
                    type="button"
                    className="reset-steps-btn no-print"
                    onClick={resetStepsChecklist}
                >
                    Reset Steps
                </button>

                {stepsProgress === 100 && totalSteps > 0 && (

                    <h3 className="steps-success">
                        🎉 Congratulations! You completed all cooking steps!
                    </h3>

                )}

                {/* Clear Saved Progress */}

                <button
                    type="button"
                    className="clear-progress-btn no-print"
                    onClick={clearSavedProgress}
                >
                    🗑️ Clear All Saved Progress
                </button>

            </section>

            {/* Cooking Summary and Achievement */}

            <section className="cooking-summary-section">

                <h2>🏆 Cooking Completion Summary</h2>

                <p>
                    Track your complete cooking progress here.
                </p>

                <div className="summary-progress-info">

                    <strong>Overall Cooking Progress</strong>

                    <span>{overallProgress}%</span>

                </div>

                <div className="summary-progress-container">

                    <div
                        className="summary-progress-bar"
                        style={{ width: `${overallProgress}%` }}
                    ></div>

                </div>

                <div className="summary-stats">

                    <div className="summary-card">

                        <h3>🥕 Ingredients</h3>

                        <p>
                            {completedIngredients} / {totalIngredients}
                        </p>

                        <span>Completed</span>

                    </div>

                    <div className="summary-card">

                        <h3>👩‍🍳 Cooking Steps</h3>

                        <p>
                            {completedStepsCount} / {totalSteps}
                        </p>

                        <span>Completed</span>

                    </div>

                </div>

                {/* Achievement Badge */}

                {isRecipeCompleted ? (

                    <div className="achievement-section">

                        <div className="achievement-badge">
                            🏆
                        </div>

                        <h2>Master Chef Achievement Unlocked!</h2>

                        <h3>🎉 Congratulations!</h3>

                        <p>
                            You successfully completed all ingredients
                            and cooking instructions.
                        </p>

                        <h3>🍽️ You are a Master Chef!</h3>

                        <span className="achievement-label">
                            RECIPE COMPLETED
                        </span>

                    </div>

                ) : (

                    <div className="cooking-pending-message">

                        <p>
                            Keep going! Complete the remaining ingredients and steps.
                        </p>

                        <strong>
                            {totalTasks - completedTasks} tasks remaining.
                        </strong>

                    </div>

                )}

            </section>

            {/* Recipe Sharing */}

            <section className="recipe-sharing-section no-print">

                <h2>📤 Share This Recipe</h2>

                <p>
                    Loved this recipe? Share it with your friends and family!
                </p>

                <div className="sharing-buttons">

                    <button onClick={copyRecipeLink}>
                        🔗 Copy Link
                    </button>

                    <button onClick={shareOnWhatsApp}>
                        💬 WhatsApp
                    </button>

                    <button onClick={shareOnFacebook}>
                        📘 Facebook
                    </button>

                    <button onClick={shareByEmail}>
                        ✉️ Email
                    </button>

                </div>

            </section>

            {/* Back Button */}

            <div className="back-button no-print">

                <Link to="/recipes">
                    ← Back to Explore Recipes
                </Link>

            </div>

            {/* Reviews */}

            <div className="no-print">

                <ReviewSection
                    key={recipe.id}
                    recipeId={recipe.id}
                />

            </div>

        </div>

    );

}

export default RecipeDetails;
