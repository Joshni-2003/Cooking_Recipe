
import { useState } from 'react';

function MyRecipes() {

    const [myRecipes, setMyRecipes] = useState([
        {
            id: 1,
            name: 'Vegetable Biryani',
            category: 'Indian',
            status: 'Approved',
            description: 'A delicious vegetable biryani.',
            ingredients: [
                { name: 'Rice', quantity: '2', unit: 'cups', preparationNote: '' },
                { name: 'Carrot', quantity: '1', unit: 'piece', preparationNote: 'Chopped' }
            ],
            instructions: [
                'Wash and soak the rice.',
                'Cook vegetables with spices.',
                'Add rice and cook until done.'
            ]
        },
        {
            id: 2,
            name: 'Chocolate Cake',
            category: 'Dessert',
            status: 'Draft',
            description: 'A soft and tasty chocolate cake.',
            ingredients: [
                { name: 'Flour', quantity: '2', unit: 'cups', preparationNote: '' },
                { name: 'Cocoa Powder', quantity: '1', unit: 'cup', preparationNote: '' }
            ],
            instructions: [
                'Mix all dry ingredients.',
                'Add wet ingredients and mix.',
                'Bake until fully cooked.'
            ]
        },
        {
            id: 3,
            name: 'Paneer Butter Masala',
            category: 'Indian',
            status: 'Pending',
            description: 'Creamy paneer butter masala.',
            ingredients: [
                { name: 'Paneer', quantity: '200', unit: 'grams', preparationNote: 'Cubed' }
            ],
            instructions: [
                'Prepare the tomato gravy.',
                'Add paneer and cook.'
            ]
        },
        {
            id: 4,
            name: 'Mango Ice Cream',
            category: 'Dessert',
            status: 'Rejected',
            description: 'Homemade mango ice cream.',
            ingredients: [
                { name: 'Mango', quantity: '2', unit: 'pieces', preparationNote: 'Peeled' }
            ],
            instructions: [
                'Blend mango into a smooth mixture.',
                'Freeze until firm.'
            ]
        }
    ]);

    const [filter, setFilter] = useState('All');
    const [editingRecipe, setEditingRecipe] = useState(null);
    const [message, setMessage] = useState('');

    // Filter recipes
    const filteredRecipes = myRecipes.filter((recipe) => {
        if (filter === 'All') {
            return true;
        }

        return recipe.status === filter;
    });

    // Delete recipe
    function deleteRecipe(id) {

        const confirmDelete = window.confirm(
            'Are you sure you want to delete this recipe?'
        );

        if (confirmDelete) {

            setMyRecipes((previousRecipes) =>
                previousRecipes.filter((recipe) => recipe.id !== id)
            );

            setMessage('Recipe deleted successfully!');
        }
    }

    // Open edit form
    function handleEdit(recipe) {

        setEditingRecipe({
            ...recipe,
            ingredients: recipe.ingredients.map((item) => ({ ...item })),
            instructions: [...recipe.instructions]
        });

        setMessage('');
    }

    // Update recipe name, category and description
    function handleChange(e) {

        const { name, value } = e.target;

        setEditingRecipe((previous) => ({
            ...previous,
            [name]: value
        }));
    }

    // Update ingredient fields
    function handleIngredientChange(index, field, value) {

        setEditingRecipe((previous) => {

            const updatedIngredients = [...previous.ingredients];

            updatedIngredients[index] = {
                ...updatedIngredients[index],
                [field]: value
            };

            return {
                ...previous,
                ingredients: updatedIngredients
            };
        });
    }

    // Add ingredient
    function addIngredient() {

        setEditingRecipe((previous) => ({
            ...previous,
            ingredients: [
                ...previous.ingredients,
                {
                    name: '',
                    quantity: '',
                    unit: '',
                    preparationNote: ''
                }
            ]
        }));
    }

    // Delete ingredient
    function deleteIngredient(index) {

        setEditingRecipe((previous) => ({
            ...previous,
            ingredients: previous.ingredients.filter(
                (_, i) => i !== index
            )
        }));
    }

    // Move ingredient up or down
    function moveIngredient(index, direction) {

        setEditingRecipe((previous) => {

            const updated = [...previous.ingredients];
            const newIndex = index + direction;

            if (newIndex < 0 || newIndex >= updated.length) {
                return previous;
            }

            [updated[index], updated[newIndex]] =
                [updated[newIndex], updated[index]];

            return {
                ...previous,
                ingredients: updated
            };
        });
    }

    // Update instruction
    function handleInstructionChange(index, value) {

        setEditingRecipe((previous) => {

            const updatedInstructions = [...previous.instructions];

            updatedInstructions[index] = value;

            return {
                ...previous,
                instructions: updatedInstructions
            };
        });
    }

    // Add instruction
    function addInstruction() {

        setEditingRecipe((previous) => ({
            ...previous,
            instructions: [
                ...previous.instructions,
                ''
            ]
        }));
    }

    // Delete instruction
    function deleteInstruction(index) {

        setEditingRecipe((previous) => ({
            ...previous,
            instructions: previous.instructions.filter(
                (_, i) => i !== index
            )
        }));
    }

    // Move instruction up or down
    function moveInstruction(index, direction) {

        setEditingRecipe((previous) => {

            const updated = [...previous.instructions];
            const newIndex = index + direction;

            if (newIndex < 0 || newIndex >= updated.length) {
                return previous;
            }

            [updated[index], updated[newIndex]] =
                [updated[newIndex], updated[index]];

            return {
                ...previous,
                instructions: updated
            };
        });
    }

    // Save edited recipe
    function saveRecipe(e) {

        e.preventDefault();

        if (
            !editingRecipe.name.trim() ||
            !editingRecipe.category.trim() ||
            !editingRecipe.description.trim()
        ) {
            setMessage('Please fill in all required recipe fields.');
            return;
        }

        const validIngredients = editingRecipe.ingredients.filter(
            (item) => item.name.trim()
        );

        const validInstructions = editingRecipe.instructions.filter(
            (step) => step.trim()
        );

        if (validIngredients.length === 0) {
            setMessage('Please add at least one ingredient.');
            return;
        }

        if (validInstructions.length === 0) {
            setMessage('Please add at least one instruction.');
            return;
        }

        const updatedRecipe = {
            ...editingRecipe,
            ingredients: validIngredients,
            instructions: validInstructions
        };

        setMyRecipes((previousRecipes) =>
            previousRecipes.map((recipe) =>
                recipe.id === updatedRecipe.id
                    ? updatedRecipe
                    : recipe
            )
        );

        setEditingRecipe(null);
        setMessage('Recipe updated successfully!');
    }

    return (

        <div className="my-recipes-page">

            <div className="my-recipes-header">
                <h1>My Recipes 🍲</h1>
                <p>Manage all the recipes you have created.</p>
            </div>

            {message && (
                <p className="my-recipes-message" role="status">
                    {message}
                </p>
            )}

            {/* Filter */}
            <div className="my-recipes-filter">

                <label htmlFor="recipe-status-filter">
                    Filter by Status:
                </label>

                <select
                    id="recipe-status-filter"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="All">All Recipes</option>
                    <option value="Draft">Draft</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                </select>

            </div>

            {/* Edit Recipe Form */}
            {editingRecipe && (

                <form
                    className="edit-my-recipe-form"
                    onSubmit={saveRecipe}
                >

                    <h2>Edit Recipe</h2>

                    <label>Recipe Name</label>

                    <input
                        type="text"
                        name="name"
                        value={editingRecipe.name}
                        onChange={handleChange}
                        required
                    />

                    <label>Category</label>

                    <input
                        type="text"
                        name="category"
                        value={editingRecipe.category}
                        onChange={handleChange}
                        required
                    />

                    <label>Description</label>

                    <textarea
                        name="description"
                        value={editingRecipe.description}
                        onChange={handleChange}
                        rows="4"
                        required
                    />

                    {/* Ingredient Editor */}
                    <h3>Ingredients</h3>

                    {editingRecipe.ingredients.map((ingredient, index) => (

                        <div className="edit-ingredient-row" key={index}>

                            <h4>Ingredient {index + 1}</h4>

                            <label>Ingredient Name</label>

                            <input
                                type="text"
                                value={ingredient.name}
                                onChange={(e) =>
                                    handleIngredientChange(
                                        index,
                                        'name',
                                        e.target.value
                                    )
                                }
                                placeholder="Enter ingredient name"
                            />

                            <label>Quantity</label>

                            <input
                                type="number"
                                min="0"
                                step="any"
                                value={ingredient.quantity}
                                onChange={(e) =>
                                    handleIngredientChange(
                                        index,
                                        'quantity',
                                        e.target.value
                                    )
                                }
                                placeholder="Enter quantity"
                            />

                            <label>Unit</label>

                            <input
                                type="text"
                                value={ingredient.unit}
                                onChange={(e) =>
                                    handleIngredientChange(
                                        index,
                                        'unit',
                                        e.target.value
                                    )
                                }
                                placeholder="Example: grams, cups"
                            />

                            <label>Preparation Note</label>

                            <input
                                type="text"
                                value={ingredient.preparationNote || ''}
                                onChange={(e) =>
                                    handleIngredientChange(
                                        index,
                                        'preparationNote',
                                        e.target.value
                                    )
                                }
                                placeholder="Example: Chopped"
                            />

                            <button
                                type="button"
                                onClick={() => moveIngredient(index, -1)}
                                disabled={index === 0}
                            >
                                Move Up
                            </button>

                            <button
                                type="button"
                                onClick={() => moveIngredient(index, 1)}
                                disabled={
                                    index === editingRecipe.ingredients.length - 1
                                }
                            >
                                Move Down
                            </button>

                            <button
                                type="button"
                                onClick={() => deleteIngredient(index)}
                            >
                                Delete Ingredient
                            </button>

                        </div>

                    ))}

                    <button
                        type="button"
                        onClick={addIngredient}
                    >
                        + Add Ingredient
                    </button>

                    {/* Instruction Editor */}
                    <h3>Cooking Instructions</h3>

                    {editingRecipe.instructions.map((step, index) => (

                        <div className="edit-instruction-row" key={index}>

                            <label>Step {index + 1}</label>

                            <textarea
                                value={step}
                                onChange={(e) =>
                                    handleInstructionChange(
                                        index,
                                        e.target.value
                                    )
                                }
                                rows="3"
                                placeholder="Enter cooking instruction"
                            />

                            <button
                                type="button"
                                onClick={() => moveInstruction(index, -1)}
                                disabled={index === 0}
                            >
                                Move Up
                            </button>

                            <button
                                type="button"
                                onClick={() => moveInstruction(index, 1)}
                                disabled={
                                    index === editingRecipe.instructions.length - 1
                                }
                            >
                                Move Down
                            </button>

                            <button
                                type="button"
                                onClick={() => deleteInstruction(index)}
                            >
                                Delete Step
                            </button>

                        </div>

                    ))}

                    <button
                        type="button"
                        onClick={addInstruction}
                    >
                        + Add Instruction
                    </button>

                    {/* Form Actions */}
                    <div className="edit-recipe-actions">

                        <button type="submit">
                            Save Changes
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setEditingRecipe(null);
                                setMessage('');
                            }}
                        >
                            Cancel
                        </button>

                    </div>

                </form>
            )}

            {/* Recipe List */}
            <div className="my-recipes-list">

                {filteredRecipes.length === 0 ? (

                    <div className="no-my-recipes">
                        <h2>No Recipes Found</h2>
                        <p>There are no recipes in this category.</p>
                    </div>

                ) : (

                    filteredRecipes.map((recipe) => (

                        <div className="my-recipe-card" key={recipe.id}>

                            <div className="my-recipe-info">

                                <h2>{recipe.name}</h2>

                                <p>Category: {recipe.category}</p>

                                <p>{recipe.description}</p>

                                <span className={`my-recipe-status ${recipe.status.toLowerCase()}`}>
                                    {recipe.status}
                                </span>

                            </div>

                            <div className="my-recipe-actions">

                                <button
                                    type="button"
                                    className="edit-my-recipe-btn"
                                    onClick={() => handleEdit(recipe)}
                                >
                                    Edit
                                </button>

                                <button
                                    type="button"
                                    className="delete-my-recipe-btn"
                                    onClick={() => deleteRecipe(recipe.id)}
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    ))

                )}

            </div>

        </div>
    );
}

export default MyRecipes;
