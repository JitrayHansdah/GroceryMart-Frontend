import {
    createContext,
    useEffect,
    useState,
} from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {

        const savedCart =
            localStorage.getItem("cartItems");

        return savedCart
            ? JSON.parse(savedCart)
            : [];
    });

    useEffect(() => {

        localStorage.setItem(
            "cartItems",
            JSON.stringify(cartItems)
        );

    }, [cartItems]);

    // ADD TO CART
    const addToCart = (product) => {

        const itemExists = cartItems.find(
            (item) => item._id === product._id
        );

        if (itemExists) {

            setCartItems(
                cartItems.map((item) =>
                    item._id === product._id
                        ? {
                            ...item,
                            quantity: item.quantity + 1,
                        }
                        : item
                )
            );

        } else {

            setCartItems([
                ...cartItems,
                {
                    ...product,
                    quantity: 1,
                },
            ]);

        }
    };

    // REMOVE ITEM
    const removeFromCart = (id) => {

        setCartItems(
            cartItems.filter((item) => item._id !== id)
        );
    };

    // INCREASE QTY
    const increaseQty = (id) => {

        setCartItems(
            cartItems.map((item) =>
                item._id === id
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                    }
                    : item
            )
        );
    };

    // DECREASE QTY
    const decreaseQty = (id) => {

        setCartItems(
            cartItems.map((item) =>
                item._id === id
                    ? {
                        ...item,
                        quantity:
                            item.quantity > 1
                                ? item.quantity - 1
                                : 1,
                    }
                    : item
            )
        );
    };
    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                increaseQty,
                decreaseQty,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;