import { useContext } from "react";
import classes from "./RecipeItem.module.css";
import DetailsContext from "../../Details/DetailsContext";

const RecipeItem = ({ id, name, ingredients, instructions }) => {
    const detailsCtx = useContext(DetailsContext);

    return (
        <li className={classes.recipe}>
            <div>
                <h2>{name}</h2>
            </div>
            <button
                onClick={() =>
                    detailsCtx.viewItem({ id, name, ingredients, instructions })
                }
            >
                View Recipe
            </button>
        </li>
    );
};

export default RecipeItem;
