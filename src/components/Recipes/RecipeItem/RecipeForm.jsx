import { useState } from "react";
import ConfirmModal from "../../UI/ConfirmModal";

import axios from "axios";
import classes from "./RecipeForm.module.css";

const RecipeForm = ({
    id,
    name,
    ingredients,
    instructions,
    onClose,
    fetchRecipes,
}) => {
    const [recipeName, setRecipeName] = useState(name || "");
    const [recipeIngredients, setRecipeIngredients] = useState(
        ingredients && ingredients.length > 0 ? ingredients : [""]
    );
    const [recipeInstructions, setRecipeInstructions] = useState(
        instructions || ""
    );
    const [showConfirm, setShowConfirm] = useState(false);

    const addIngredientHandler = () => {
        setRecipeIngredients([...recipeIngredients, ""]);
    };

    const ingredientChangeHandler = (index, value) => {
        const updatedIngredients = [...recipeIngredients];
        updatedIngredients[index] = value;
        setRecipeIngredients(updatedIngredients);
    };

    const deleteIngredientHandler = (index) => {
        if (recipeIngredients.length > 1) {
            setRecipeIngredients(
                recipeIngredients.filter((_, i) => i !== index)
            );
        }
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        const newRecipe = {
            name: recipeName,
            ingredients: recipeIngredients,
            instructions: recipeInstructions,
        };

        if (id) {
            // Update existing recipe
            await axios.put(
                `https://smith-kitchen-chronicles-default-rtdb.firebaseio.com/recipes/${id}.json`,
                newRecipe
            );
        } else {
            // Add new recipe
            await axios.post(
                "https://smith-kitchen-chronicles-default-rtdb.firebaseio.com/recipes.json",
                newRecipe
            );
        }

        fetchRecipes();

        onClose();
    };

    const deleteHandler = async () => {
        if (!id) return; // Error Handling here would be nice. Stretch goal.

        await axios.delete(
            `https://smith-kitchen-chronicles-default-rtdb.firebaseio.com/recipes/${id}.json`
        );

        fetchRecipes();
        onClose();
    };

    return (
        <>
            {showConfirm && (
                <>
                    <div className={classes.overlay}></div>{" "}
                    <ConfirmModal
                        recipeName={recipeName}
                        message={`Are you sure you want to delete this recipe?`}
                        onConfirm={deleteHandler}
                        onCancel={() => setShowConfirm(false)}
                    />
                </>
            )}
            <form className={classes.form} onSubmit={submitHandler}>
                <h2>{id ? "Edit Recipe" : "Add Recipe"}</h2>
                <label>Recipe Name:</label>
                <input
                    type="text"
                    value={recipeName}
                    onChange={(e) => setRecipeName(e.target.value)}
                    required
                />

                <label>Ingredients:</label>
                <div className={classes["ingredients-container"]}>
                    {recipeIngredients.map((ingredient, index) => (
                        <div key={index} className={classes["ingredient-item"]}>
                            <input
                                type="text"
                                value={ingredient}
                                onChange={(e) =>
                                    ingredientChangeHandler(
                                        index,
                                        e.target.value
                                    )
                                }
                                required
                            />
                            <button
                                type="button"
                                onClick={() => deleteIngredientHandler(index)}
                                disabled={recipeIngredients.length === 1} // Disable delete button if last ingredient
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
                <button
                    type="button"
                    className={classes["add-ingredient-button"]}
                    onClick={addIngredientHandler}
                >
                    + Add Ingredient
                </button>

                <label>Instructions:</label>
                <textarea
                    value={recipeInstructions}
                    onChange={(e) => setRecipeInstructions(e.target.value)}
                    required
                />

                <div className={classes.actions}>
                    {id && (
                        <button
                            type="button"
                            className={classes["delete-button"]}
                            onClick={() => setShowConfirm(true)}
                        >
                            Delete Recipe
                        </button>
                    )}
                    <button type="button" onClick={onClose}>
                        Cancel
                    </button>
                    <button type="submit">Save</button>
                </div>
            </form>
        </>
    );
};

export default RecipeForm;
