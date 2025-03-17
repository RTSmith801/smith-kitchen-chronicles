import Card from "../UI/Card";
import classes from "./AvailableRecipes.module.css";
import RecipeItem from "./RecipeItem/RecipeItem";

const AvailableRecipes = ({ recipes, isLoading, httpError }) => {
    if (isLoading) {
        return (
            <section className={classes.RecipesLoading}>
                <p>Loading...</p>
            </section>
        );
    }

    if (httpError) {
        return (
            <section className={classes.RecipesError}>
                <p>{httpError}</p>
            </section>
        );
    }

    const recipeList = recipes.map((recipe) => (
        <RecipeItem
            id={recipe.id}
            key={recipe.id}
            name={recipe.name}
            ingredients={recipe.ingredients}
            instructions={recipe.instructions}
        />
    ));

    return (
        <section className={classes.recipes}>
            <Card>
                <ul>{recipeList}</ul>
            </Card>
        </section>
    );
};

export default AvailableRecipes;
