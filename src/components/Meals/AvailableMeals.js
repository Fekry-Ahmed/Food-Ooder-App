import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

function AvailableMeals(props) {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const fetchMeals = async function () {
            setIsLoading(true);
            const res = await fetch(
                `https://react-http-fe2a9-default-rtdb.firebaseio.com/meals.json`
            );
            if (!res.ok) {
                setIsLoading(false);
                throw new Error(`Something Went Wrong`);
            }
            const data = await res.json();

            const loadedMeals = [];

            for (const key in data) {
                loadedMeals.push({
                    id: key,
                    name: data[key].name,
                    description: data[key].description,
                    price: data[key].price,
                });
            }
            setMeals(loadedMeals);
            setIsLoading(false);
        };

        fetchMeals().catch((err) => {
            setIsLoading(false);
            setHttpError(err.message);
        });
    }, []);

    if (isLoading) {
        return (
            <section>
                <p className={classes["meals-loading"]}>
                    Loading
                    <span className={classes.dots}>
                        <span className={classes.dot}></span>
                        <span className={classes.dot}></span>
                        <span className={classes.dot}></span>
                    </span>
                </p>
            </section>
        );
    }

    if (httpError) {
        return (
            <section>
                <p className={classes["meals-error"]}>{httpError}</p>
            </section>
        );
    }

    const mealsList = meals.map((meal) => (
        <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        ></MealItem>
    ));

    return (
        <section className={classes.meals}>
            <Card>
                <ul>{mealsList}</ul>
            </Card>
        </section>
    );
}

export default AvailableMeals;
