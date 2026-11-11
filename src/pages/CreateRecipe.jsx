
import { useState, useEffect } from 'react';
import IngredientEditor from '../components/IngredientEditor';
import InstructionEditor from '../components/InstructionEditor';

function CreateRecipe() {

    // Recipe form data
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        cookingTime: '',
        description: '',
        image: null
    });

    // Store image preview URL
    const [imagePreview, setImagePreview] = useState('');

    // Ingredients state
    const [ingredients, setIngredients] = useState([
        {
            name: '',
            quantity: '',
            unit: 'cup'
        }
    ]);

    // Instructions state
    const [instructions, setInstructions] = useState(['']);

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Clean up old preview URLs
    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    // Handle normal recipe input changes
    function handleChange(e) {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        setErrors({
            ...errors,
            [name]: ''
        });

        setSuccess('');
    }

    // Handle image selection
    function handleImageChange(e) {

        const file = e.target.files[0];

        if (!file) return;

        const allowedTypes = [
            'image/jpeg',
            'image/png',
            'image/webp'
        ];

        // Check image format
        if (!allowedTypes.includes(file.type)) {

            setErrors({
                ...errors,
                image: 'Only JPG, JPEG, PNG and WEBP images are allowed.'
            });

            e.target.value = '';
            return;
        }

        // Check image size (5 MB)
        const maxSize = 5 * 1024 * 1024;

        if (file.size > maxSize) {

            setErrors({
                ...errors,
                image: 'Image size must not exceed 5 MB.'
            });

            e.target.value = '';
            return;
        }

        // Store selected image
        setFormData({
            ...formData,
            image: file
        });

        // Create image preview
        const previewURL = URL.createObjectURL(file);
        setImagePreview(previewURL);

        setErrors({
            ...errors,
            image: ''
        });

        setSuccess('');
    }

    // Remove selected image
    function handleRemoveImage() {

        setFormData({
            ...formData,
            image: null
        });

        setImagePreview('');

        const imageInput = document.getElementById('recipe-image');

        if (imageInput) {
            imageInput.value = '';
        }

        setErrors({
            ...errors,
            image: ''
        });
    }

    // Handle form submission
    function handleSubmit(e) {

        e.preventDefault();

        const newErrors = {};

        // Recipe name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Recipe name is required';
        }

        // Category validation
        if (!formData.category) {
            newErrors.category = 'Please select a category';
        }

        // Cooking time validation
        if (
            !formData.cookingTime ||
            !Number.isFinite(Number(formData.cookingTime)) ||
            Number(formData.cookingTime) <= 0
        ) {
            newErrors.cookingTime = 'Enter a valid cooking time';
        }

        // Description validation
        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        }

        // Ingredient validation
        const validIngredients = ingredients.filter(
            (item) =>
                item.name.trim() &&
                Number(item.quantity) > 0 &&
                item.unit
        );

        if (
            validIngredients.length === 0 ||
            validIngredients.length !== ingredients.length
        ) {
            newErrors.ingredients =
                'Please complete all ingredient fields.';
        }

        // Instruction validation
        const validInstructions = instructions.filter(
            (step) => step.trim() !== ''
        );

        if (
            validInstructions.length === 0 ||
            validInstructions.length !== instructions.length
        ) {
            newErrors.instructions =
                'Please complete all cooking steps.';
        }

        setErrors(newErrors);

        // Stop submission if errors exist
        if (Object.keys(newErrors).length > 0) {
            return;
        }

        // Prepare recipe data
        const newRecipe = {
            ...formData,
            ingredients: ingredients,
            instructions: instructions
        };

        // Frontend demonstration only
        console.log('Submitted Recipe:', newRecipe);

        setIsLoading(true);

        setTimeout(() => {

            setIsLoading(false);

            setSuccess(
                'Recipe form submitted successfully! Backend API is not connected yet.'
            );

            // Reset recipe form
            setFormData({
                name: '',
                category: '',
                cookingTime: '',
                description: '',
                image: null
            });

            // Reset image preview
            setImagePreview('');

            const imageInput = document.getElementById('recipe-image');

            if (imageInput) {
                imageInput.value = '';
            }

            // Reset ingredients
            setIngredients([
                {
                    name: '',
                    quantity: '',
                    unit: 'cup'
                }
            ]);

            // Reset instructions
            setInstructions(['']);

        }, 500);
    }

    return (

        <div className="create-recipe-page">

            <div className="create-recipe-card">

                <h1>Share Your Recipe</h1>

                <p>
                    Add your favourite dish to our recipe community.
                </p>

                <form onSubmit={handleSubmit}>

                    {/* Recipe Name */}
                    <label htmlFor="recipe-name">
                        Recipe Name
                    </label>

                    <input
                        id="recipe-name"
                        type="text"
                        name="name"
                        placeholder="Enter recipe name"
                        value={formData.name}
                        onChange={handleChange}
                    />

                    {errors.name && (
                        <span className="error">
                            {errors.name}
                        </span>
                    )}

                    {/* Category */}
                    <label htmlFor="recipe-category">
                        Category
                    </label>

                    <select
                        id="recipe-category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option value="">Select category</option>
                        <option value="Indian">Indian</option>
                        <option value="South Indian">South Indian</option>
                        <option value="Dessert">Dessert</option>
                        <option value="Chinese">Chinese</option>
                    </select>

                    {errors.category && (
                        <span className="error">
                            {errors.category}
                        </span>
                    )}

                    {/* Cooking Time */}
                    <label htmlFor="cooking-time">
                        Cooking Time (minutes)
                    </label>

                    <input
                        id="cooking-time"
                        type="number"
                        name="cookingTime"
                        placeholder="Example: 30"
                        min="1"
                        value={formData.cookingTime}
                        onChange={handleChange}
                    />

                    {errors.cookingTime && (
                        <span className="error">
                            {errors.cookingTime}
                        </span>
                    )}

                    {/* Description */}
                    <label htmlFor="recipe-description">
                        Description
                    </label>

                    <textarea
                        id="recipe-description"
                        name="description"
                        placeholder="Describe your recipe"
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                    />

                    {errors.description && (
                        <span className="error">
                            {errors.description}
                        </span>
                    )}

                    {/* Ingredient Editor */}
                    <IngredientEditor
                        ingredients={ingredients}
                        setIngredients={setIngredients}
                    />

                    {errors.ingredients && (
                        <span className="error">
                            {errors.ingredients}
                        </span>
                    )}

                    {/* Instruction Editor */}
                    <InstructionEditor
                        instructions={instructions}
                        setInstructions={setInstructions}
                    />

                    {errors.instructions && (
                        <span className="error">
                            {errors.instructions}
                        </span>
                    )}

                    {/* Recipe Image Upload */}
                    <label htmlFor="recipe-image">
                        Upload Recipe Image (Optional)
                    </label>

                    <input
                        id="recipe-image"
                        type="file"
                        accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                        onChange={handleImageChange}
                    />

                    <small>
                        Allowed formats: JPG, JPEG, PNG, WEBP.
                        Maximum size: 5 MB.
                    </small>

                    {errors.image && (
                        <span className="error">
                            {errors.image}
                        </span>
                    )}

                    {/* Image Preview */}
                    {imagePreview && (

                        <div className="image-preview-container">

                            <h3>Image Preview</h3>

                            <img
                                src={imagePreview}
                                alt="Selected recipe preview"
                                className="recipe-image-preview"
                            />

                            <button
                                type="button"
                                className="remove-image-btn"
                                onClick={handleRemoveImage}
                            >
                                Remove Image
                            </button>

                        </div>

                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="create-submit-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Submitting...' : 'Submit Recipe'}
                    </button>

                    {/* Success Message */}
                    {success && (
                        <p className="create-success" role="status">
                            {success}
                        </p>
                    )}

                </form>

            </div>

        </div>
    );
}

export default CreateRecipe;
