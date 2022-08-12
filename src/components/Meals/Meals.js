import React from "react";

import MealsSummary from "./MealsSummary";
import AvailableMeals from "./AvailableMeals";

function Meals(props) {
    return (
        <>
            <MealsSummary></MealsSummary>
            <AvailableMeals></AvailableMeals>
        </>
    );
}

export default Meals;
