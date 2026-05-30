import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";

function Profile() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const [name, setName] =
        useState(user?.name || "");

    const [email, setEmail] =
        useState(user?.email || "");

    const [address, setAddress] =
        useState(
            localStorage.getItem("address") || ""
        );

    const [orders, setOrders] =
        useState([]);

    // FETCH ORDERS

    const fetchOrders = async () => {

        try {

            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/orders/${user._id}`
            );

            setOrders(res.data);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        fetchOrders();

    }, []);

    // SAVE PROFILE

    const saveProfile = () => {

        const updatedUser = {
            ...user,
            name,
            email,
        };

        localStorage.setItem(
            "user",
            JSON.stringify(updatedUser)
        );

        localStorage.setItem(
            "address",
            address
        );

        alert("Profile Updated Successfully");
    };

    // TOTAL SPENT

    const totalSpent =
        orders.reduce(

            (total, order) =>
                total + order.totalAmount,

            0
        );

    return (

        <div className="bg-gray-100 min-h-screen">

            <Navbar />

            {/* HERO SECTION */}

            <div className="bg-[#398f8d] text-white py-8 px-10 shadow-lg">

                <div className="w-full flex flex-col md:flex-row items-center justify-between">

                    <div>

                        <h1 className="text-5xl font-bold">
                            My Profile
                        </h1>

                        <p className="mt-3 text-lg text-teal-100">
                            Manage your account, orders and delivery details
                        </p>

                    </div>

                    {/* PROFILE ICON */}

                    <div className="mt-6 md:mt-0">

                        <div className="w-20 h-20 rounded-full bg-white text-[#398f8d] flex items-center justify-center text-4xl font-bold shadow-xl">

                            {name?.charAt(0)}

                        </div>

                    </div>

                </div>

            </div>

            {/* MAIN SECTION */}

            <div className="w-full px-10 py-10">

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

                    {/* LEFT SIDE */}

                    <div className="xl:col-span-9 space-y-8">

                        {/* PERSONAL INFO */}

                        <div className="bg-white rounded-3xl p-8 shadow-md">

                            <h2 className="text-3xl font-bold mb-8">
                                Personal Information
                            </h2>

                            <div className="grid md:grid-cols-2 gap-6">

                                <div>

                                    <label className="font-semibold text-gray-600">
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        className="border border-gray-300 w-full p-4 rounded-2xl mt-2 focus:outline-none focus:ring-2 focus:ring-[#398f8d]"
                                    />

                                </div>

                                <div>

                                    <label className="font-semibold text-gray-600">
                                        Email Address
                                    </label>

                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        className="border border-gray-300 w-full p-4 rounded-2xl mt-2 focus:outline-none focus:ring-2 focus:ring-[#398f8d]"
                                    />

                                </div>

                            </div>

                        </div>

                        {/* ADDRESS */}

                        <div className="bg-white rounded-3xl p-8 shadow-md">

                            <h2 className="text-3xl font-bold mb-8">
                                Delivery Address
                            </h2>

                            <textarea
                                rows="5"
                                value={address}
                                onChange={(e) =>
                                    setAddress(e.target.value)
                                }
                                placeholder="Enter your full address..."
                                className="border border-gray-300 w-full p-5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#398f8d]"
                            />

                            <button
                                onClick={saveProfile}
                                className="bg-[#398f8d] hover:bg-[#2f7775] text-white px-8 py-4 rounded-2xl mt-6 text-lg font-semibold transition"
                            >
                                Save Changes
                            </button>

                        </div>

                        {/* RECENT ORDERS */}

                        <div className="bg-white rounded-3xl p-6 shadow-md w-full">

                            <h2 className="text-3xl font-bold mb-8">
                                Recent Orders
                            </h2>

                            <div className="space-y-6">

                                {orders.map((order) => (

                                    <div
                                        key={order._id}
                                        className="border border-gray-200 rounded-3xl p-6 hover:shadow-lg transition"
                                    >

                                        {/* TOP */}

                                        <div className="flex flex-col lg:flex-row justify-between gap-5 mb-6">

                                            <div>

                                                <h3 className="text-2xl font-bold">
                                                    Order #{order._id.slice(-6)}
                                                </h3>

                                                <p className="text-gray-500 mt-2">
                                                    {new Date(order.createdAt).toLocaleDateString()}
                                                </p>

                                                <p className="text-gray-500">
                                                    {order.paymentMethod}
                                                </p>

                                            </div>

                                            <div className="lg:text-right">

                                                <p className="text-3xl font-bold text-[#398f8d]">
                                                    ₹{order.totalAmount}
                                                </p>

                                                <span className="inline-block mt-3 bg-[#398f8d]/10 text-[#398f8d] px-4 py-2 rounded-full font-semibold">
                                                    {order.orderStatus}
                                                </span>

                                            </div>

                                        </div>

                                        {/* ORDER ITEMS */}

                                        <div className="space-y-4">

                                            {order.items.map((item, index) => (

                                                <div
                                                    key={index}
                                                    className="flex items-center gap-5 border rounded-2xl p-4"
                                                >

                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-24 h-24 object-cover rounded-2xl"
                                                    />

                                                    <div className="flex-1">

                                                        <h4 className="text-xl font-bold">
                                                            {item.name}
                                                        </h4>

                                                        <p className="text-gray-500 mt-1">
                                                            Quantity: {item.quantity}
                                                        </p>

                                                    </div>

                                                    <div>

                                                        <p className="text-2xl font-bold text-[#398f8d]">
                                                            ₹{item.price}
                                                        </p>

                                                    </div>

                                                </div>
                                            ))}

                                        </div>

                                    </div>
                                ))}

                            </div>

                        </div>

                    </div>

                    {/* RIGHT SIDEBAR */}

                    <div className="xl:col-span-3 space-y-6">

                        {/* TOTAL ORDERS */}

                        <div className="bg-white rounded-3xl p-8 shadow-md">

                            <h2 className="text-gray-500 text-lg">
                                Total Orders
                            </h2>

                            <p className="text-6xl font-bold mt-5 text-[#398f8d]">
                                {orders.length}
                            </p>

                        </div>

                        {/* TOTAL SPENDING */}

                        <div className="bg-white rounded-3xl p-8 shadow-md">

                            <h2 className="text-gray-500 text-lg">
                                Total Spending
                            </h2>

                            <p className="text-5xl font-bold mt-5 text-[#398f8d]">
                                ₹{totalSpent}
                            </p>

                        </div>

                        {/* PREMIUM CARD */}

                        <div className="bg-[#398f8d] text-white rounded-3xl p-8 shadow-lg">

                            <h2 className="text-3xl font-bold">
                                Premium Customer
                            </h2>

                            <p className="mt-4 text-teal-100 leading-7">
                                Thanks for shopping with GroceryMart. Enjoy fast delivery and premium support.
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Profile;