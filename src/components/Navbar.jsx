import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

import { CartContext } from "../context/CartContext";

function Navbar() {

    const { cartItems } = useContext(CartContext);

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    // LOGOUT

    const logoutHandler = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        navigate("/login");
    };

    return (

        <div className="bg-white shadow-md px-8 py-4 flex justify-between items-center">

            {/* LOGO */}

            <Link
                to="/"
                className="text-3xl font-bold text-[#398f8d]"
            >
                GroceryMart
            </Link>

            {/* RIGHT SIDE */}

            <div className="flex items-center gap-6">

                {token ? (

                    <>
                        {/* HOME */}

                        <Link
                            to="/"
                            className="font-semibold hover:text-[#398f8d]"
                        >
                            Home
                        </Link>

                        {/* ORDERS */}

                        <Link
                            to="/orders"
                            className="font-semibold hover:text-[#398f8d]"
                        >
                            Orders
                        </Link>

                        {/* PROFILE */}

                        <Link
                            to="/profile"
                            className="font-semibold hover:text-[#398f8d]"
                        >
                            Profile
                        </Link>

                        {/* CART */}

                        <Link
                            to="/cart"
                            className="relative font-semibold hover:text-[#398f8d]"
                        >
                            Cart

                            <span className="absolute -top-3 -right-4 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                {cartItems.length}
                            </span>

                        </Link>

                        {/* USER */}

                        {user && (

                            <p className="font-semibold text-[#398f8d]">
                                Hi, {user.name}
                            </p>

                        )}

                        {/* LOGOUT */}

                        <button
                            onClick={logoutHandler}
                            className="bg-[#398f8d] hover:bg-[#2f7775] text-white px-5 py-2 rounded-xl"
                        >
                            Logout
                        </button>

                    </>

                ) : (

                    <>
                        {/* LOGIN */}

                        <Link
                            to="/login"
                            className="font-semibold hover:text-[#398f8d]"
                        >
                            Login
                        </Link>

                        {/* REGISTER */}

                        <Link
                            to="/register"
                            className="bg-[#398f8d] hover:bg-[#2f7775] text-white px-5 py-2 rounded-xl"
                        >
                            Register
                        </Link>

                    </>

                )}

            </div>

        </div>
    );
}

export default Navbar;