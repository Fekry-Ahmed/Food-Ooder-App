import React from "react";

import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import mealsImage from "../../assets/meals.jpg";

function Header(props) {
    return (
        <>
            <header className={classes.header}>
                <h1>React Meals</h1>

                <HeaderCartButton onClick={props.onShowCart}>
                    {" "}
                </HeaderCartButton>
            </header>

            <div className={classes["main-image"]}>
                <img src={mealsImage} alt="a table full of gelicious food!" />
            </div>
        </>
    );
}

export default Header;
