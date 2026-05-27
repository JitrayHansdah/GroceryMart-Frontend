import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../context/CartContext";

function ProductCard({ product }) {

    const navigate = useNavigate();

    const { addToCart } =
        useContext(CartContext);

    return (

        <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300 group">

            {/* IMAGE */}

            <div
                onClick={() =>
                    navigate(`/product/${product._id}`)
                }
                className="overflow-hidden cursor-pointer"
            >

                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-56 object-cover group-hover:scale-105 transition duration-300"
                />

            </div>

            {/* CONTENT */}

            <div className="p-5">

                {/* TOP */}

                <div className="flex justify-between items-center gap-3">

                    <h2 className="text-xl font-bold">
                        {product.name}
                    </h2>

                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm whitespace-nowrap">
                        {product.category}
                    </span>

                </div>

                {/* DESCRIPTION */}

                <p className="text-gray-500 mt-3 line-clamp-2">
                    {product.description}
                </p>

                {/* PRICE */}

                <div className="mt-5">

                    <p className="text-2xl font-bold text-green-600">
                        ₹{product.price}/{product.unit || "kg"}
                    </p>

                </div>

                {/* BUTTONS */}

                <div className="flex gap-3 mt-5">

                    <button
                        onClick={() =>
                            navigate(`/product/${product._id}`)
                        }
                        className="flex-1 border border-green-600 text-green-600 hover:bg-green-50 py-2 rounded-xl font-semibold"
                    >
                        View Details
                    </button>

                    <button
                        onClick={() =>
                            addToCart(product)
                        }
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl font-semibold"
                    >
                        Add To Cart
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ProductCard;