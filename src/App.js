import { useState } from "react";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CardProvider from "./store/CardProvider";

function App() {
    const [cartIsShown, setCartIsShown] = useState(false);

    const showCartHandler = () => {
        setCartIsShown(true);
    };

    const hideCartHandler = () => {
        setCartIsShown(false);
    };

    return (
        <CardProvider>
            {cartIsShown && <Cart onClose={hideCartHandler}></Cart>}
            <Header onShowCart={showCartHandler}></Header>
            <main>
                <Meals></Meals>
            </main>
        </CardProvider>
    );
}

export default App;
