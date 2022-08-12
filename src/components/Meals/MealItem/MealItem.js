import React, { useContext } from "react";
import MealItemForm from "./MealItemForm";
import classes from "./MealItem.module.css";
import CartContext from "../../../store/cart-context";

function MealItem(props) {
    const cartCtx = useContext(CartContext);

    const price = `$${props.price.toFixed(2)}`;

    const addToCartHandler = function (amount) {
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            amount,
            price: props.price,
        });
    };

    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <p className={classes.description}>{props.description}</p>
                <span className={classes.price}> {price}</span>
            </div>
            <div>
                <MealItemForm onAddToCart={addToCartHandler}></MealItemForm>
            </div>
        </li>
    );
}

export default MealItem;
