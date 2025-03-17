import mealsImage from "../../assets/meals.jpg";
import classes from "./Header.module.css";

const Header = ({ onAddRecipe }) => {
    return (
        <>
            <header className={classes.header}>
                <h1>Smith Kitchen Chronicles</h1>

                <button className={classes.button} onClick={onAddRecipe}>
                    + Add Recipe
                </button>
            </header>
            <div className={classes["main-image"]}>
                <img src={mealsImage} alt="A table full of delicious food!" />;
            </div>
        </>
    );
};

export default Header;
