import { useState } from "react";
import Modal from "./Modal";
import RecipeForm from "../Recipes/RecipeItem/RecipeForm";
import classes from "./RecipeModal.module.css";

const RecipeModal = ({ recipe, onClose, fetchRecipes }) => {
    const [isEditing, setIsEditing] = useState(recipe === null);

    return (
        <Modal onClose={onClose}>
            {isEditing ? (
                <RecipeForm
                    {...(recipe || {})}
                    onClose={onClose}
                    fetchRecipes={fetchRecipes}
                />
            ) : (
                <>
                    <h2 className={classes.recipe}>{recipe.name}</h2>
                    <ul>
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                    <p>{recipe.instructions}</p>
                    <div className={classes.actions}>
                        <button onClick={() => setIsEditing(true)}>Edit</button>
                        <button onClick={onClose}>Close</button>
                    </div>
                </>
            )}
        </Modal>
    );
};

export default RecipeModal;
