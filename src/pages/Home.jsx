import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

function Home() {

    const [products, setProducts] =
        useState([]);

    const [search, setSearch] =
        useState("");

    const [selectedCategory, setSelectedCategory] =
        useState("All");

    const fetchProducts = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/api/products"
            );

            setProducts(res.data);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        fetchProducts();

    }, []);

    // FILTER PRODUCTS

    const filteredProducts =
        products.filter((product) => {

            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    );

            const matchesCategory =
                selectedCategory === "All" ||
                product.category ===
                selectedCategory;

            return (
                matchesSearch &&
                matchesCategory
            );
        });

    // CATEGORY LIST

    const categories = [

        "All",
        "Fruits",
        "Vegetables",
        "Dairy",
        "Groceries",
        "Snacks",

    ];

    return (

        <div className="bg-gray-100 min-h-screen">

            <Navbar />

            {/* HERO SECTION */}

            <div className="bg-green-600 text-white p-10">

                <h1 className="text-5xl font-bold">
                    Fresh Grocery Delivered Fast
                </h1>

                <p className="mt-4 text-xl">
                    Order fruits, vegetables,
                    dairy, snacks and more
                </p>

            </div>

            {/* SEARCH + FILTER */}

            <div className="p-8">

                {/* SEARCH BAR */}

                <div className="mb-8">

                    <input
                        type="text"
                        placeholder="Search Products..."
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                        className="w-full p-4 rounded-xl border outline-none text-lg shadow-sm"
                    />

                </div>

                {/* CATEGORY BUTTONS */}

                <div className="flex flex-wrap gap-4 mb-10">

                    {categories.map((category) => (

                        <button
                            key={category}
                            onClick={() =>
                                setSelectedCategory(
                                    category
                                )
                            }
                            className={`px-5 py-3 rounded-xl font-semibold transition ${selectedCategory ===
                                category
                                ? "bg-green-600 text-white"
                                : "bg-white text-gray-700"
                                }`}
                        >
                            {category}
                        </button>

                    ))}

                </div>

                {/* PRODUCTS */}

                <div className="flex justify-between items-center mb-8">

                    <h2 className="text-3xl font-bold">
                        Products
                    </h2>

                    <p className="text-gray-600 font-medium">
                        {filteredProducts.length}
                        {" "}Items Found
                    </p>

                </div>

                {/* PRODUCT GRID */}

                {filteredProducts.length === 0 ? (

                    <div className="bg-white p-10 rounded-xl shadow text-center">

                        <h2 className="text-3xl font-bold text-gray-500">
                            No Products Found
                        </h2>

                    </div>

                ) : (

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                        {filteredProducts.map((product) => (

                            <ProductCard
                                key={product._id}
                                product={product}
                            />

                        ))}

                    </div>

                )}

            </div>
            <Footer />
        </div>
    );
}

export default Home;