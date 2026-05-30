import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { CartContext } from "../context/CartContext";

function Cart() {

    const navigate = useNavigate();

    const [paymentMethod, setPaymentMethod] =
        useState("online");

    const {
        cartItems,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
    } = useContext(CartContext);

    // TOTAL PRICE

    const totalPrice = cartItems.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );

    // CHECKOUT

    const checkoutHandler = async () => {

        try {

            const user = JSON.parse(
                localStorage.getItem("user")
            );

            const savedAddress =
                localStorage.getItem(
                    "deliveryAddress"
                );

            // IF ADDRESS NOT FOUND

            if (!savedAddress) {

                navigate("/address");

                return;
            }

            // CASH ON DELIVERY

            if (paymentMethod === "cod") {

                const orderData = {

                    userId: user._id,

                    items: cartItems,

                    totalAmount:
                        totalPrice + 40,

                    deliveryAddress:
                        savedAddress,

                    paymentMethod: "COD",

                    paymentStatus: "Pending",
                };

                await axios.post(
                    "${https://grocerymart-backend.onrender.com}/api/orders",
                    orderData
                );

                clearCart();

                navigate("/order-success");

                return;
            }

            // ONLINE PAYMENT

            const { data } = await axios.post(
                "${https://grocerymart-backend.onrender.com}/api/payment/create-order",
                {
                    amount:
                        totalPrice + 40,
                }
            );

            const options = {

                key:
                    "rzp_test_SrhSrVT1f3e5qw",

                amount: data.amount,

                currency:
                    data.currency,

                name: "GroceryMart",

                description:
                    "Grocery Payment",

                order_id: data.id,

                handler: async function (response) {

                    const orderData = {

                        userId: user._id,

                        items: cartItems,

                        totalAmount:
                            totalPrice + 40,

                        deliveryAddress:
                            savedAddress,

                        paymentMethod:
                            "Online",

                        paymentStatus:
                            "Paid",

                        paymentId:
                            response.razorpay_payment_id,
                    };

                    await axios.post(
                        "${https://grocerymart-backend.onrender.com}/api/orders",
                        orderData
                    );

                    clearCart();

                    navigate("/order-success");
                },

                theme: {
                    color: "#16a34a",
                },
            };

            const razorpay =
                new window.Razorpay(options);

            razorpay.open();

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Payment Failed"
            );
        }
    };

    return (

        <div className="bg-gray-100 min-h-screen">

            <Navbar />

            <div className="p-8">

                <h1 className="text-4xl font-bold mb-8">
                    Shopping Cart
                </h1>

                {cartItems.length === 0 ? (

                    <div className="bg-white p-10 rounded-xl shadow text-center">

                        <h2 className="text-3xl font-bold text-gray-500">
                            Your Cart is Empty
                        </h2>

                    </div>

                ) : (

                    <div className="grid lg:grid-cols-4 gap-6">

                        {/* CART ITEMS */}

                        <div className="lg:col-span-3 space-y-4">

                            {cartItems.map((item) => (

                                <div
                                    key={item._id}
                                    className="bg-white p-5 rounded-xl shadow flex flex-col md:flex-row justify-between items-center gap-5"
                                >

                                    {/* PRODUCT */}

                                    <div className="flex items-center gap-5">

                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-28 h-28 object-cover rounded-lg"
                                        />

                                        <div>

                                            <h2 className="text-2xl font-bold">
                                                {item.name}
                                            </h2>

                                            <p className="text-gray-500">
                                                {item.category}
                                            </p>

                                            <p className="text-green-600 text-xl font-bold mt-2">
                                                ₹{item.price}/{item.unit || "kg"}
                                            </p>

                                        </div>

                                    </div>

                                    {/* QUANTITY */}

                                    <div className="flex items-center gap-3">

                                        <button
                                            onClick={() =>
                                                decreaseQty(item._id)
                                            }
                                            className="bg-gray-300 px-4 py-2 rounded-lg text-xl"
                                        >
                                            -
                                        </button>

                                        <span className="text-2xl font-bold">
                                            {item.quantity}
                                        </span>

                                        <button
                                            onClick={() =>
                                                increaseQty(item._id)
                                            }
                                            className="bg-gray-300 px-4 py-2 rounded-lg text-xl"
                                        >
                                            +
                                        </button>

                                    </div>

                                    {/* REMOVE */}

                                    <button
                                        onClick={() =>
                                            removeFromCart(item._id)
                                        }
                                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
                                    >
                                        Remove
                                    </button>

                                </div>
                            ))}

                        </div>

                        {/* ORDER SUMMARY */}

                        <div className="bg-white p-8 rounded-xl shadow h-fit">

                            <h2 className="text-3xl font-bold mb-6">
                                Order Summary
                            </h2>

                            <div className="space-y-4 text-lg">

                                <div className="flex justify-between">
                                    <span>Items</span>

                                    <span>
                                        {cartItems.length}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Delivery</span>

                                    <span>₹40</span>
                                </div>

                                <hr />

                                <div className="flex justify-between text-2xl font-bold">
                                    <span>Total</span>

                                    <span>
                                        ₹{totalPrice + 40}
                                    </span>
                                </div>

                            </div>

                            {/* ADDRESS */}

                            <div className="bg-gray-100 p-4 rounded-lg mt-6">

                                <div className="flex justify-between items-center">

                                    <div>

                                        <h3 className="font-bold text-lg">
                                            Delivery Address
                                        </h3>

                                        <p className="text-gray-600 mt-2">
                                            {
                                                localStorage.getItem(
                                                    "deliveryAddress"
                                                ) || "No Address Added"
                                            }
                                        </p>

                                    </div>

                                    <button
                                        onClick={() =>
                                            navigate("/address")
                                        }
                                        className="text-green-600 font-semibold"
                                    >
                                        Change
                                    </button>

                                </div>

                            </div>

                            {/* PAYMENT METHOD */}

                            <div className="mt-6">

                                <h3 className="text-xl font-bold mb-3">
                                    Payment Method
                                </h3>

                                <div className="flex gap-4">

                                    <button
                                        onClick={() =>
                                            setPaymentMethod("online")
                                        }
                                        className={`px-4 py-2 rounded-lg border ${paymentMethod === "online"
                                            ? "bg-green-600 text-white"
                                            : "bg-white"
                                            }`}
                                    >
                                        Online Payment
                                    </button>

                                    <button
                                        onClick={() =>
                                            setPaymentMethod("cod")
                                        }
                                        className={`px-4 py-2 rounded-lg border ${paymentMethod === "cod"
                                            ? "bg-green-600 text-white"
                                            : "bg-white"
                                            }`}
                                    >
                                        Cash On Delivery
                                    </button>

                                </div>

                            </div>

                            {/* CHECKOUT BUTTON */}

                            <button
                                onClick={checkoutHandler}
                                className="bg-green-600 hover:bg-green-700 text-white w-full mt-8 py-4 rounded-xl text-xl font-semibold"
                            >
                                {paymentMethod === "cod"
                                    ? "Place COD Order"
                                    : "Pay Now"}
                            </button>

                        </div>

                    </div>
                )}

            </div>

        </div>
    );
}

export default Cart;