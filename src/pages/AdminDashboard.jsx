import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";

function AdminDashboard() {

    const [products, setProducts] =
        useState([]);

    const [formData, setFormData] =
        useState({

            name: "",
            price: "",
            category: "",
            image: "",
            description: "",
            stock: "",

        });

    // FETCH PRODUCTS

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

    // INPUT CHANGE

    const changeHandler = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value,

        });
    };

    // ADD PRODUCT

    const submitHandler = async (e) => {

        e.preventDefault();

        try {

            await axios.post(
                "http://localhost:5000/api/products",
                formData
            );

            alert("Product Added");

            setFormData({

                name: "",
                price: "",
                category: "",
                image: "",
                description: "",
                stock: "",

            });

            fetchProducts();

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div className="bg-gray-100 min-h-screen">

            <Navbar />

            <div className="p-8">

                <h1 className="text-4xl font-bold mb-8">
                    Admin Dashboard
                </h1>

                {/* ADD PRODUCT FORM */}

                <div className="bg-white p-8 rounded-2xl shadow mb-10">

                    <h2 className="text-3xl font-bold mb-6">
                        Add Product
                    </h2>

                    <form
                        onSubmit={submitHandler}
                        className="grid md:grid-cols-2 gap-6"
                    >

                        <input
                            type="text"
                            name="name"
                            placeholder="Product Name"
                            value={formData.name}
                            onChange={changeHandler}
                            className="border p-4 rounded-xl"
                            required
                        />

                        <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={formData.price}
                            onChange={changeHandler}
                            className="border p-4 rounded-xl"
                            required
                        />

                        <input
                            type="text"
                            name="category"
                            placeholder="Category"
                            value={formData.category}
                            onChange={changeHandler}
                            className="border p-4 rounded-xl"
                            required
                        />

                        <input
                            type="number"
                            name="stock"
                            placeholder="Stock"
                            value={formData.stock}
                            onChange={changeHandler}
                            className="border p-4 rounded-xl"
                            required
                        />

                        <input
                            type="text"
                            name="image"
                            placeholder="Image URL"
                            value={formData.image}
                            onChange={changeHandler}
                            className="border p-4 rounded-xl md:col-span-2"
                            required
                        />

                        <textarea
                            rows="4"
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={changeHandler}
                            className="border p-4 rounded-xl md:col-span-2"
                            required
                        />

                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl text-xl font-semibold md:col-span-2"
                        >
                            Add Product
                        </button>

                    </form>

                </div>

                {/* PRODUCTS */}

                <div>

                    <h2 className="text-3xl font-bold mb-6">
                        All Products
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {products.map((product) => (

                            <div
                                key={product._id}
                                className="bg-white rounded-2xl shadow p-5"
                            >

                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-52 object-cover rounded-xl"
                                />

                                <h3 className="text-2xl font-bold mt-4">
                                    {product.name}
                                </h3>

                                <p className="text-gray-500 mt-2">
                                    {product.category}
                                </p>

                                <p className="text-green-600 text-2xl font-bold mt-3">
                                    ₹{product.price}
                                </p>

                                <p className="mt-2">
                                    Stock: {product.stock}
                                </p>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </div>
    );
}

export default AdminDashboard;