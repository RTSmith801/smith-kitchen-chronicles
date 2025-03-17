import { useState } from "react";
import DetailsContext from "./DetailsContext";

const DetailsProvider = (props) => {
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const viewDetailsHandler = (recipe) => {
        setSelectedRecipe(recipe);
    };

    const closeDetailsHandler = () => {
        setSelectedRecipe(null);
    };

    const detailsContext = {
        selectedRecipe,
        viewItem: viewDetailsHandler,
        closeItem: closeDetailsHandler,
    };

    return (
        <DetailsContext.Provider value={detailsContext}>
            {props.children}
        </DetailsContext.Provider>
    );
};

export default DetailsProvider;
