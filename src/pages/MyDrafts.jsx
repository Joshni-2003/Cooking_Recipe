
import { useState } from 'react';

function MyDrafts() {

    const [drafts, setDrafts] = useState([
        {
            id: 1,
            name: 'Chocolate Brownie',
            category: 'Dessert',
            description: 'A delicious homemade chocolate brownie.',
            ingredients: 'Chocolate, flour, sugar, butter',
            instructions: 'Mix ingredients and bake for 30 minutes.'
        },
        {
            id: 2,
            name: 'Vegetable Fried Rice',
            category: 'Chinese',
            description: 'Healthy vegetable fried rice.',
            ingredients: 'Rice, carrot, beans, capsicum',
            instructions: 'Cook vegetables and mix with cooked rice.'
        },
        {
            id: 3,
            name: 'Mango Milkshake',
            category: 'Drinks',
            description: 'Fresh mango milkshake.',
            ingredients: '',
            instructions: ''
        }
    ]);

    const [editingDraft, setEditingDraft] = useState(null);
    const [message, setMessage] = useState('');

    // Open a draft for editing
    function continueDraft(draft) {
        setEditingDraft({ ...draft });
        setMessage('');
    }

    // Update form fields
    function handleChange(e) {
        const { name, value } = e.target;

        setEditingDraft({
            ...editingDraft,
            [name]: value
        });
    }

    // Save draft changes
    function saveDraft(e) {
        e.preventDefault();

        if (
            !editingDraft.name.trim() ||
            !editingDraft.category.trim() ||
            !editingDraft.description.trim()
        ) {
            setMessage('Please fill in the recipe name, category and description.');
            return;
        }

        setDrafts((previousDrafts) =>
            previousDrafts.map((draft) =>
                draft.id === editingDraft.id
                    ? editingDraft
                    : draft
            )
        );

        setEditingDraft(null);
        setMessage('Draft saved successfully!');
    }

    // Submit draft for moderation
    function submitDraft(id) {

        const selectedDraft = drafts.find(
            (draft) => draft.id === id
        );

        if (!selectedDraft) {
            return;
        }

        if (
            !selectedDraft.name.trim() ||
            !selectedDraft.category.trim() ||
            !selectedDraft.description.trim() ||
            !selectedDraft.ingredients.trim() ||
            !selectedDraft.instructions.trim()
        ) {
            setMessage(
                'Complete all recipe details before submitting.'
            );
            return;
        }

        const confirmSubmit = window.confirm(
            'Submit this recipe for moderator approval?'
        );

        if (confirmSubmit) {
            setDrafts((previousDrafts) =>
                previousDrafts.filter(
                    (draft) => draft.id !== id
                )
            );

            setMessage(
                'Recipe submitted successfully for moderation!'
            );
        }
    }

    // Delete a draft
    function deleteDraft(id) {

        const confirmDelete = window.confirm(
            'Are you sure you want to delete this draft?'
        );

        if (confirmDelete) {
            setDrafts((previousDrafts) =>
                previousDrafts.filter(
                    (draft) => draft.id !== id
                )
            );

            setMessage('Draft deleted successfully!');
        }
    }

    return (
        <div className="my-drafts-page">

            <div className="my-drafts-header">
                <h1>My Drafts 📝</h1>
                <p>Continue your recipes and submit them for approval.</p>
            </div>

            {message && (
                <p className="draft-message">
                    {message}
                </p>
            )}

            {/* Edit Draft Form */}
            {editingDraft && (

                <form
                    className="draft-edit-form"
                    onSubmit={saveDraft}
                >

                    <h2>Continue Editing Your Recipe</h2>

                    <label>Recipe Name</label>

                    <input
                        type="text"
                        name="name"
                        value={editingDraft.name}
                        onChange={handleChange}
                        placeholder="Enter recipe name"
                    />

                    <label>Category</label>

                    <input
                        type="text"
                        name="category"
                        value={editingDraft.category}
                        onChange={handleChange}
                        placeholder="Enter category"
                    />

                    <label>Description</label>

                    <textarea
                        name="description"
                        value={editingDraft.description}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Describe your recipe"
                    />

                    <label>Ingredients</label>

                    <textarea
                        name="ingredients"
                        value={editingDraft.ingredients}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Enter ingredients separated by commas"
                    />

                    <label>Cooking Instructions</label>

                    <textarea
                        name="instructions"
                        value={editingDraft.instructions}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Enter cooking instructions"
                    />

                    <div className="draft-form-actions">

                        <button type="submit">
                            Save Draft
                        </button>

                        <button
                            type="button"
                            onClick={() => setEditingDraft(null)}
                        >
                            Cancel
                        </button>

                    </div>

                </form>
            )}

            {/* Draft List */}
            <div className="draft-list">

                {drafts.length === 0 ? (

                    <div className="no-drafts">
                        <h2>No Drafts Available</h2>
                        <p>You have no saved draft recipes.</p>
                    </div>

                ) : (

                    drafts.map((draft) => (

                        <div className="draft-card" key={draft.id}>

                            <div className="draft-card-info">

                                <h2>{draft.name}</h2>

                                <p>
                                    Category: {draft.category}
                                </p>

                                <p>{draft.description}</p>

                                <span className="draft-status">
                                    Draft
                                </span>

                            </div>

                            <div className="draft-card-actions">

                                <button
                                    className="continue-draft-btn"
                                    onClick={() => continueDraft(draft)}
                                >
                                    Continue Editing
                                </button>

                                <button
                                    className="submit-draft-btn"
                                    onClick={() => submitDraft(draft.id)}
                                >
                                    Submit for Approval
                                </button>

                                <button
                                    className="delete-draft-btn"
                                    onClick={() => deleteDraft(draft.id)}
                                >
                                    Delete Draft
                                </button>

                            </div>

                        </div>

                    ))

                )}

            </div>

        </div>
    );
}

export default MyDrafts;
