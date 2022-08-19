import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import CardItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

function Cart(props) {
    const [isCheckot, setIsCheckot] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = function (id) {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = function (item) {
        cartCtx.addItem(item);
    };

    const orderHandler = function () {
        setIsCheckot(true);
    };

    const onSubmitHandler = async function (userData) {
        setIsSubmitting(true);
        await fetch(
            "https://react-http-fe2a9-default-rtdb.firebaseio.com/orders.json",
            {
                method: "POST",
                body: JSON.stringify({
                    user: userData,
                    orderedItems: cartCtx.items,
                }),
            }
        );
        setIsSubmitted(true);
        setIsSubmitting(false);
        cartCtx.clearCart();
    };

    const cardItems = (
        <ul className={classes["cart-items"]}>
            {cartCtx.items.map((item) => (
                <CardItem
                    name={item.name}
                    key={item.id}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                ></CardItem>
            ))}
        </ul>
    );

    const modalActions = (
        <div className={classes.actions}>
            <button className={classes["cutton--alt"]} onClick={props.onClose}>
                Close
            </button>
            {hasItems && (
                <button className={classes.button} onClick={orderHandler}>
                    Order
                </button>
            )}
        </div>
    );

    const cartModalContent = (
        <>
            {cardItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>

            {isCheckot && (
                <Checkout
                    onSubmit={onSubmitHandler}
                    onCancel={props.onClose}
                ></Checkout>
            )}
            {!isCheckot && modalActions}
        </>
    );

    const isSubmittingModalContent = <p>Sending order data ...</p>;

    const submittedModalContent = (
        <>
            <p>Successfully sent the order!</p>
            <div className={classes.actions}>
                <button
                    className={classes["cutton--alt"]}
                    onClick={props.onClose}
                >
                    Close
                </button>
            </div>
        </>
    );

    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !isSubmitted && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && isSubmitted && submittedModalContent}
        </Modal>
    );
}

export default Cart;
