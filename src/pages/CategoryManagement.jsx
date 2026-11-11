
import { useState } from 'react';

function CategoryManagement() {

    const [categories, setCategories] = useState([
        { id: 1, name: 'Indian', description: 'Traditional Indian recipes' },
        { id: 2, name: 'Chinese', description: 'Chinese food recipes' },
        { id: 3, name: 'Italian', description: 'Italian food recipes' },
        { id: 4, name: 'Desserts', description: 'Sweet dishes and desserts' }
    ]);

    const [tags, setTags] = useState([
        { id: 1, name: 'Vegetarian' },
        { id: 2, name: 'Spicy' },
        { id: 3, name: 'Healthy' },
        { id: 4, name: 'Vegan' }
    ]);

    const [categoryName, setCategoryName] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');

    const [tagName, setTagName] = useState('');

    const [editingCategoryId, setEditingCategoryId] = useState(null);

    const [message, setMessage] = useState('');

    // Add or update category
    function handleCategorySubmit(e) {
        e.preventDefault();

        if (!categoryName.trim() || !categoryDescription.trim()) {
            setMessage('Please enter category name and description.');
            return;
        }

        const duplicate = categories.some(
            (category) =>
                category.name.toLowerCase() === categoryName.trim().toLowerCase() &&
                category.id !== editingCategoryId
        );

        if (duplicate) {
            setMessage('This category already exists.');
            return;
        }

        if (editingCategoryId !== null) {

            setCategories((previousCategories) =>
                previousCategories.map((category) =>
                    category.id === editingCategoryId
                        ? {
                            ...category,
                            name: categoryName.trim(),
                            description: categoryDescription.trim()
                        }
                        : category
                )
            );

            setMessage('Category updated successfully!');

        } else {

            const newCategory = {
                id: Date.now(),
                name: categoryName.trim(),
                description: categoryDescription.trim()
            };

            setCategories((previousCategories) => [
                ...previousCategories,
                newCategory
            ]);

            setMessage('Category added successfully!');
        }

        resetCategoryForm();
    }

    // Edit category
    function editCategory(category) {
        setEditingCategoryId(category.id);
        setCategoryName(category.name);
        setCategoryDescription(category.description);
        setMessage('');
    }

    // Delete category
    function deleteCategory(id) {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this category?'
        );

        if (confirmDelete) {
            setCategories((previousCategories) =>
                previousCategories.filter(
                    (category) => category.id !== id
                )
            );

            setMessage('Category deleted successfully!');

            if (editingCategoryId === id) {
                resetCategoryForm();
            }
        }
    }

    // Reset category form
    function resetCategoryForm() {
        setCategoryName('');
        setCategoryDescription('');
        setEditingCategoryId(null);
    }

    // Add tag
    function handleTagSubmit(e) {
        e.preventDefault();

        if (!tagName.trim()) {
            setMessage('Please enter a tag name.');
            return;
        }

        const duplicate = tags.some(
            (tag) =>
                tag.name.toLowerCase() === tagName.trim().toLowerCase()
        );

        if (duplicate) {
            setMessage('This tag already exists.');
            return;
        }

        const newTag = {
            id: Date.now(),
            name: tagName.trim()
        };

        setTags((previousTags) => [
            ...previousTags,
            newTag
        ]);

        setTagName('');
        setMessage('Tag added successfully!');
    }

    // Delete tag
    function deleteTag(id) {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this tag?'
        );

        if (confirmDelete) {
            setTags((previousTags) =>
                previousTags.filter((tag) => tag.id !== id)
            );

            setMessage('Tag deleted successfully!');
        }
    }

    return (
        <div className="category-management-page">

            <div className="category-management-header">
                <h1>Category and Tag Management ⚙️</h1>
                <p>Manage recipe categories and tags.</p>
            </div>

            {message && (
                <p className="category-management-message">
                    {message}
                </p>
            )}

            {/* Category Management */}
            <section className="category-management-section">

                <h2>Manage Categories</h2>

                <form
                    className="category-management-form"
                    onSubmit={handleCategorySubmit}
                >

                    <label>Category Name</label>

                    <input
                        type="text"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        placeholder="Enter category name"
                    />

                    <label>Category Description</label>

                    <textarea
                        value={categoryDescription}
                        onChange={(e) => setCategoryDescription(e.target.value)}
                        placeholder="Enter category description"
                        rows="3"
                    />

                    <div className="category-form-actions">

                        <button type="submit">
                            {editingCategoryId !== null
                                ? 'Update Category'
                                : 'Add Category'}
                        </button>

                        {editingCategoryId !== null && (
                            <button
                                type="button"
                                onClick={resetCategoryForm}
                            >
                                Cancel
                            </button>
                        )}

                    </div>

                </form>

                <div className="category-list">

                    {categories.map((category) => (

                        <div className="category-item" key={category.id}>

                            <div>
                                <h3>{category.name}</h3>
                                <p>{category.description}</p>
                            </div>

                            <div className="category-item-actions">

                                <button
                                    onClick={() => editCategory(category)}
                                    className="category-edit-btn"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => deleteCategory(category.id)}
                                    className="category-delete-btn"
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            </section>

            {/* Tag Management */}
            <section className="tag-management-section">

                <h2>Manage Recipe Tags</h2>

                <form
                    className="tag-management-form"
                    onSubmit={handleTagSubmit}
                >

                    <input
                        type="text"
                        value={tagName}
                        onChange={(e) => setTagName(e.target.value)}
                        placeholder="Enter a new tag"
                    />

                    <button type="submit">
                        Add Tag
                    </button>

                </form>

                <div className="tag-list">

                    {tags.map((tag) => (

                        <div className="tag-item" key={tag.id}>

                            <span>{tag.name}</span>

                            <button
                                onClick={() => deleteTag(tag.id)}
                            >
                                Delete
                            </button>

                        </div>

                    ))}

                </div>

            </section>

        </div>
    );
}

export default CategoryManagement;
