
function IngredientEditor({ ingredients, setIngredients }) {

    // Update an ingredient
    function handleIngredientChange(index, field, value) {
        const updatedIngredients = [...ingredients];

        updatedIngredients[index] = {
            ...updatedIngredients[index],
            [field]: value
        };

        setIngredients(updatedIngredients);
    }

    // Add a new ingredient row
    function addIngredient() {
        setIngredients([
            ...ingredients,
            {
                name: '',
                quantity: '',
                unit: 'cup'
            }
        ]);
    }

    // Delete an ingredient row
    function deleteIngredient(index) {
        const updatedIngredients = ingredients.filter(
            (_, i) => i !== index
        );

        setIngredients(updatedIngredients);
    }

    return (
        <div className="ingredient-editor">

            <h3>Recipe Ingredients</h3>

            {ingredients.map((ingredient, index) => (

                <div className="ingredient-row" key={index}>

                    <input
                        type="text"
                        placeholder="Ingredient name"
                        value={ingredient.name}
                        onChange={(e) =>
                            handleIngredientChange(
                                index,
                                'name',
                                e.target.value
                            )
                        }
                    />

                    <input
                        type="number"
                        placeholder="Quantity"
                        min="0.01"
                        step="0.01"
                        value={ingredient.quantity}
                        onChange={(e) =>
                            handleIngredientChange(
                                index,
                                'quantity',
                                e.target.value
                            )
                        }
                    />

                    <select
                        value={ingredient.unit}
                        onChange={(e) =>
                            handleIngredientChange(
                                index,
                                'unit',
                                e.target.value
                            )
                        }
                    >
                        <option value="cup">Cup</option>
                        <option value="tbsp">Tablespoon</option>
                        <option value="tsp">Teaspoon</option>
                        <option value="g">Gram</option>
                        <option value="kg">Kilogram</option>
                        <option value="ml">Millilitre</option>
                        <option value="piece">Piece</option>
                    </select>

                    <button
                        type="button"
                        className="remove-ingredient-btn"
                        onClick={() => deleteIngredient(index)}
                    >
                        Delete
                    </button>

                </div>

            ))}

            <button
                type="button"
                className="add-ingredient-btn"
                onClick={addIngredient}
            >
                + Add Ingredient
            </button>

        </div>
    );
}

export default IngredientEditor;
