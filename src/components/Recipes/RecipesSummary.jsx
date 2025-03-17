import classes from "./RecipesSummary.module.css";

const RecipesSummary = ({ searchTerm, setSearchTerm }) => {
    return (
        <section className={classes.summary}>
            <h2>A collection of our favorite recipes</h2>
            <p>
                Select any of the below recipes to view needed ingredients and
                instructions.
            </p>
            <p>Use the add recipe button to add to this collection!</p>

            <div className={classes.searchBar}>
                <input
                    type="text"
                    placeholder="Search for a recipe..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </section>
    );
};

export default RecipesSummary;
