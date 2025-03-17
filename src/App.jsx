import { useState, useEffect } from "react";
import axios from "axios";

import Header from "./components/Layout/Header";
import Recipes from "./components/Recipes/Recipes";
import RecipeModal from "./components/UI/RecipeModal";
import DetailsProvider from "./components/Details/DetailsProvider";

function App() {
    const [recipeIsShown, setRecipeIsShown] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const [recipes, setRecipes] = useState([]);
    // const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = () => {
        setIsLoading(true);

        axios
            .get(
                "https://smith-kitchen-chronicles-default-rtdb.firebaseio.com/recipes.json"
            )
            .then((res) => {
                if (res.data) {
                    const loadedRecipes = Object.keys(res.data).map((key) => ({
                        id: key,
                        ...res.data[key],
                    }));
                    setRecipes(loadedRecipes);
                } else {
                    setRecipes([]);
                }
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
                setHttpError(err.message);
            });
    };

    // const filteredRecipes = recipes.filter((recipe) =>
    //     recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    // );

    const showRecipeHandler = (recipe = null) => {
        setSelectedRecipe(recipe);
        setRecipeIsShown(true);
    };

    const hideRecipeHandler = () => {
        setRecipeIsShown(false);
        setSelectedRecipe(null);
    };

    return (
        <DetailsProvider>
            {recipeIsShown && (
                <RecipeModal
                    recipe={selectedRecipe}
                    onClose={hideRecipeHandler}
                    fetchRecipes={fetchRecipes}
                />
            )}
            <Header onAddRecipe={() => showRecipeHandler()} />
            <main>
                <Recipes
                    onShowRecipe={showRecipeHandler}
                    recipes={recipes}
                    // recipes={filteredRecipes}
                    isLoading={isLoading}
                    httpError={httpError}
                    fetchRecipes={fetchRecipes}
                />
            </main>
        </DetailsProvider>
    );
}

export default App;
