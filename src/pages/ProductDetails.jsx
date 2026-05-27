import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { CartContext } from "../context/CartContext";

function ProductDetails() {

    const { id } = useParams();

    const [product, setProduct] =
        useState(null);

    const { addToCart } =
        useContext(CartContext);

    const fetchProduct = async () => {

        try {

            const res = await axios.get(
                `http://localhost:5000/api/products/${id}`
            );

            setProduct(res.data);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        fetchProduct();

    }, []);

    if (!product) {

        return (

            <div className="text-center mt-20 text-3xl font-bold">

                Loading...

            </div>
        );
    }

    return (

        <div className="bg-gray-100 min-h-screen">

            <Navbar />

            <div className="max-w-7xl mx-auto p-8">

                <div className="bg-white rounded-2xl shadow-lg grid md:grid-cols-2 gap-10 p-8">

                    {/* IMAGE */}

                    <div>

                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-[500px] object-cover rounded-2xl"
                        />

                    </div>

                    {/* DETAILS */}

                    <div className="flex flex-col justify-center">

                        <p className="text-green-600 font-semibold text-lg">
                            {product.category}
                        </p>

                        <h1 className="text-5xl font-bold mt-3">
                            {product.name}
                        </h1>

                        <p className="text-4xl font-bold text-green-600 mt-6">
                            ₹{product.price}/{product.unit || "kg"}
                        </p>

                        <p className="text-gray-600 mt-6 leading-8 text-lg">
                            {product.description}
                        </p>

                        {/* EXTRA INFO */}

                        <div className="mt-8 space-y-3">

                            <p className="text-lg">
                                🚚 Delivery in 20-30 mins
                            </p>

                            <p className="text-lg">
                                ✅ Fresh & Organic
                            </p>

                            <p className="text-lg">
                                ⭐ Premium Quality
                            </p>

                        </div>

                        {/* BUTTON */}

                        <button
                            onClick={() =>
                                addToCart(product)
                            }
                            className="bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl text-xl font-semibold mt-10"
                        >
                            Add To Cart
                        </button>

                    </div>

                </div>

            </div>

            <Footer />

        </div>
    );
}

export default ProductDetails;