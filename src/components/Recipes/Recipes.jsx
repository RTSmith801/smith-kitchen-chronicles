import { useContext, useState } from "react";
import AvailableRecipes from "./AvailableRecipes";
import RecipesSummary from "./RecipesSummary";
import DetailsContext from "../Details/DetailsContext";
import RecipeModal from "../UI/RecipeModal";

const Recipes = ({ recipes, isLoading, httpError, fetchRecipes }) => {
    const detailsCtx = useContext(DetailsContext);
    const [searchTerm, setSearchTerm] = useState("");

    // Filter recipes based on search input
    const filteredRecipes = recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <RecipesSummary
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />

            <AvailableRecipes
                recipes={filteredRecipes}
                isLoading={isLoading}
                httpError={httpError}
            />
            {detailsCtx.selectedRecipe && (
                <RecipeModal
                    recipe={detailsCtx.selectedRecipe}
                    onClose={detailsCtx.closeItem}
                    fetchRecipes={fetchRecipes}
                />
            )}
        </>
    );
};

export default Recipes;
