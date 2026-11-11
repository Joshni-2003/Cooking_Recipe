
function InstructionEditor({ instructions, setInstructions }) {

    // Edit an existing cooking step
    function handleInstructionChange(index, value) {
        const updatedInstructions = [...instructions];

        updatedInstructions[index] = value;

        setInstructions(updatedInstructions);
    }

    // Add a new cooking step
    function addInstruction() {
        setInstructions([
            ...instructions,
            ''
        ]);
    }

    // Delete a cooking step
    function deleteInstruction(index) {
        const updatedInstructions = instructions.filter(
            (_, i) => i !== index
        );

        setInstructions(updatedInstructions);
    }

    return (
        <div className="instruction-editor">

            <h3>Cooking Instructions</h3>

            {instructions.map((instruction, index) => (

                <div className="instruction-row" key={index}>

                    <label>Step {index + 1}</label>

                    <textarea
                        placeholder={`Enter cooking step ${index + 1}`}
                        rows="3"
                        value={instruction}
                        onChange={(e) =>
                            handleInstructionChange(index, e.target.value)
                        }
                    />

                    <button
                        type="button"
                        className="remove-instruction-btn"
                        onClick={() => deleteInstruction(index)}
                    >
                        Delete Step
                    </button>

                </div>

            ))}

            <button
                type="button"
                className="add-instruction-btn"
                onClick={addInstruction}
            >
                + Add Step
            </button>

        </div>
    );
}

export default InstructionEditor;
