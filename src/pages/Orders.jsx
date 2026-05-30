import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Orders() {

    const [orders, setOrders] = useState([]);

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    useEffect(() => {

        fetchOrders();

    }, []);

    const fetchOrders = async () => {

        try {

            const { data } = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/orders/${user._id}`
            );

            setOrders(data);

        } catch (error) {

            console.log(error);
        }
    };

    const cancelOrder = async (id) => {

        try {


            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/orders/cancel/${id}`
            );

            fetchOrders();

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div className="bg-gray-100 min-h-screen">

            <Navbar />

            <div className="p-8">

                <h1 className="text-4xl font-bold mb-8">
                    My Orders
                </h1>

                {orders.length === 0 ? (

                    <div className="bg-white p-10 rounded-xl shadow text-center">

                        <h2 className="text-3xl font-bold text-gray-500">
                            No Orders Found
                        </h2>

                    </div>

                ) : (

                    <div className="space-y-6">

                        {orders.map((order) => (

                            <div
                                key={order._id}
                                className="bg-white p-6 rounded-xl shadow"
                            >

                                {/* TOP */}

                                <div className="flex flex-col md:flex-row justify-between gap-4">

                                    <div>

                                        <h2 className="text-2xl font-bold">
                                            Order #{order._id.slice(-6)}
                                        </h2>

                                        <p className="text-gray-500 mt-1">
                                            Payment:
                                            {" "}
                                            {order.paymentMethod}
                                        </p>

                                        <p className="text-gray-500">
                                            Address:
                                            {" "}
                                            {order.deliveryAddress}
                                        </p>

                                    </div>

                                    <div className="text-right">

                                        <p className="text-3xl font-bold text-green-600">
                                            ₹{order.totalAmount}
                                        </p>

                                        <p className="text-blue-600 font-semibold mt-2">
                                            {order.orderStatus}
                                        </p>

                                        {order.orderStatus !== "Cancelled" && (

                                            <button
                                                onClick={() =>
                                                    cancelOrder(order._id)
                                                }
                                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg mt-4"
                                            >
                                                Cancel Order
                                            </button>
                                        )}

                                    </div>

                                </div>

                                {/* ITEMS */}

                                <div className="mt-6 space-y-4">

                                    {order.items.map((item, index) => (

                                        <div
                                            key={index}
                                            className="flex items-center gap-4 border-b pb-4"
                                        >

                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-20 h-20 rounded-lg object-cover"
                                            />

                                            <div>

                                                <h3 className="text-xl font-semibold">
                                                    {item.name}
                                                </h3>

                                                <p className="text-gray-500">
                                                    Qty: {item.quantity}
                                                </p>

                                                <p className="text-green-600 font-bold">
                                                    ₹{item.price}
                                                </p>

                                            </div>

                                        </div>
                                    ))}

                                </div>

                                {/* TRACK BUTTON */}

                                <div className="mt-6">

                                    <Link
                                        to="/tracking"
                                        className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg inline-block"
                                    >
                                        Track Order
                                    </Link>

                                </div>

                            </div>
                        ))}

                    </div>
                )}

            </div>

        </div>
    );
}

export default Orders;